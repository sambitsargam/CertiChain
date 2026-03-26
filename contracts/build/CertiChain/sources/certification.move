module certichain::certification {
    use one::object::UID;
    use one::tx_context::TxContext;
    use one::transfer;
    use one::event;
    use std::string::String;
    use one::table::{Self, Table};

    // Error codes
    const EUnauthorized: u64 = 1;
    const ECertificateNotFound: u64 = 2;
    const EInvalidData: u64 = 3;

    // Certificate NFT
    public struct Certificate has key, store {
        id: UID,
        recipient: address,
        issuer: address,
        title: String,
        description: String,
        institution: String,
        issue_date: u64,
        certificate_hash: String,
        metadata_url: String,
        ai_verified: bool,
        verification_score: u64,
    }

    // Issuer Registry
    public struct IssuerRegistry has key {
        id: UID,
        verified_issuers: Table<address, IssuerInfo>,
        total_issuers: u64,
        admin: address,
    }

    public struct IssuerInfo has store {
        name: String,
        verified: bool,
        total_issued: u64,
    }

    // Events
    public struct CertificateIssued has copy, drop {
        certificate_id: address,
        recipient: address,
        issuer: address,
        title: String,
    }

    public struct CertificateVerified has copy, drop {
        certificate_id: address,
        ai_verified: bool,
        verification_score: u64,
    }

    public struct IssuerRegistered has copy, drop {
        issuer: address,
        name: String,
    }

    // Initialize
    fun init(ctx: &mut TxContext) {
        let registry = IssuerRegistry {
            id: object::new(ctx),
            verified_issuers: table::new(ctx),
            total_issuers: 0,
            admin: tx_context::sender(ctx),
        };
        transfer::share_object(registry);
    }

    // Register as issuer
    public entry fun register_issuer(
        registry: &mut IssuerRegistry,
        name: String,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        let issuer_info = IssuerInfo {
            name: name,
            verified: false,
            total_issued: 0,
        };

        table::add(&mut registry.verified_issuers, sender, issuer_info);
        registry.total_issuers = registry.total_issuers + 1;

        event::emit(IssuerRegistered {
            issuer: sender,
            name: name,
        });
    }

    // Issue certificate
    public entry fun issue_certificate(
        registry: &mut IssuerRegistry,
        recipient: address,
        title: String,
        description: String,
        institution: String,
        certificate_hash: String,
        metadata_url: String,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        
        // Update issuer stats
        if (table::contains(&registry.verified_issuers, sender)) {
            let issuer_info = table::borrow_mut(&mut registry.verified_issuers, sender);
            issuer_info.total_issued = issuer_info.total_issued + 1;
        };

        let certificate = Certificate {
            id: object::new(ctx),
            recipient,
            issuer: sender,
            title,
            description,
            institution,
            issue_date: tx_context::epoch(ctx),
            certificate_hash,
            metadata_url,
            ai_verified: false,
            verification_score: 0,
        };

        let cert_addr = object::uid_to_address(&certificate.id);

        event::emit(CertificateIssued {
            certificate_id: cert_addr,
            recipient,
            issuer: sender,
            title: certificate.title,
        });

        transfer::transfer(certificate, recipient);
    }

    // AI verification
    public entry fun verify_certificate(
        certificate: &mut Certificate,
        verification_score: u64,
        _ctx: &mut TxContext
    ) {
        assert!(verification_score <= 100, EInvalidData);
        
        certificate.ai_verified = true;
        certificate.verification_score = verification_score;

        let cert_addr = object::uid_to_address(&certificate.id);

        event::emit(CertificateVerified {
            certificate_id: cert_addr,
            ai_verified: true,
            verification_score,
        });
    }

    // View functions
    public fun get_certificate_info(cert: &Certificate): (String, String, address, u64) {
        (cert.title, cert.institution, cert.issuer, cert.issue_date)
    }

    public fun is_verified(cert: &Certificate): bool {
        cert.ai_verified
    }

    public fun get_verification_score(cert: &Certificate): u64 {
        cert.verification_score
    }
}
