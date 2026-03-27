import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@onelabs/dapp-kit';
import '../styles/Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="certichain-landing">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="cert-float cert-1">🎓</div>
        <div className="cert-float cert-2">📜</div>
        <div className="cert-float cert-3">🏆</div>
        <div className="cert-float cert-4">✨</div>
        <div className="grid-overlay"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">CertiChain</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={() => navigate('/verify')}>
            Verify Certificate
          </button>
          <ConnectButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">🤖</span>
            <span>AI-Powered Verification</span>
          </div>
          <h1 className="hero-title">
            The Future of
            <br />
            <span className="gradient-text">Digital Credentials</span>
          </h1>
          <p className="hero-description">
            Issue, manage, and verify tamper-proof certificates on the blockchain.
            Powered by AI for enhanced security and authenticity validation.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/app')}>
              Get Started
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary" onClick={() => navigate('/explore')}>
              Explore Certificates
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Certificates Issued</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">500+</div>
              <div className="stat-label">Verified Institutions</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">99.9%</div>
              <div className="stat-label">AI Accuracy</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="certificate-preview">
            <div className="cert-header">
              <div className="cert-seal">🎓</div>
              <div className="cert-badge-verified">✓ Verified</div>
            </div>
            <div className="cert-body">
              <h3>Certificate of Achievement</h3>
              <p className="cert-recipient">John Doe</p>
              <p className="cert-course">Blockchain Development</p>
              <p className="cert-institution">OneChain Academy</p>
            </div>
            <div className="cert-footer">
              <div className="cert-qr">
                <div className="qr-code"></div>
              </div>
              <div className="cert-signature">
                <div className="signature-line"></div>
                <p>Authorized Signature</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose CertiChain?</h2>
          <p>The most advanced certification platform on blockchain</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Tamper-Proof</h3>
            <p>Certificates stored immutably on OneChain blockchain, ensuring permanent and unalterable records.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Verification</h3>
            <p>Advanced AI algorithms detect fraud and validate certificate authenticity in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Issuance</h3>
            <p>Issue certificates in seconds with automated blockchain transactions and NFT minting.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Verification</h3>
            <p>Anyone, anywhere can verify certificate authenticity with a simple blockchain query.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics Dashboard</h3>
            <p>Track issuance metrics, verification rates, and institutional performance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Custom Templates</h3>
            <p>Design beautiful certificates with customizable templates and branding options.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Simple, secure, and efficient</p>
        </div>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">🏛️</div>
            <h3>Register Institution</h3>
            <p>Connect your wallet and register as a verified certificate issuer on the platform.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">📝</div>
            <h3>Issue Certificate</h3>
            <p>Fill in recipient details and certificate information to mint an NFT credential.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">🤖</div>
            <h3>AI Validation</h3>
            <p>Our AI automatically validates and scores the certificate for authenticity.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">04</div>
            <div className="step-icon">✅</div>
            <h3>Verify Anytime</h3>
            <p>Recipients and verifiers can check certificate authenticity on the blockchain.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of institutions already using CertiChain</p>
          <button className="btn-cta" onClick={() => navigate('/app')}>
            Launch Application
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">🎓</span>
              <span className="logo-text">CertiChain</span>
            </div>
            <p>Securing credentials on OneChain blockchain</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#docs">Documentation</a>
              <a href="#api">API</a>
              <a href="#support">Support</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CertiChain. All rights reserved.</p>
          <div className="footer-social">
            <a href="#twitter">Twitter</a>
            <a href="#github">GitHub</a>
            <a href="#discord">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
