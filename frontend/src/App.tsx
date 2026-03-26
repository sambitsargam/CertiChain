import { useState } from 'react';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@onelabs/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import './App.css';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const REGISTRY_ID = import.meta.env.VITE_REGISTRY_ID;

function App() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const [formData, setFormData] = useState({
    recipient: '',
    title: '',
    description: '',
    institution: '',
    hash: '',
    metadataUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const issueCertificate = async () => {
    if (!formData.recipient || !formData.title || !formData.institution) {
      setMessage('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::certification::issue_certificate`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.address(formData.recipient),
          tx.pure.string(formData.title),
          tx.pure.string(formData.description),
          tx.pure.string(formData.institution),
          tx.pure.string(formData.hash),
          tx.pure.string(formData.metadataUrl),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: (result) => {
            console.log('Certificate issued:', result);
            setMessage('✅ Certificate issued successfully!');
            setFormData({
              recipient: '',
              title: '',
              description: '',
              institution: '',
              hash: '',
              metadataUrl: '',
            });
          },
          onError: (error) => {
            console.error('Error:', error);
            setMessage('❌ Error issuing certificate');
          },
        }
      );
    } catch (error) {
      console.error('Transaction error:', error);
      setMessage('❌ Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="certichain-app">
      {/* Geometric Background */}
      <div className="geometric-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Header */}
      <header className="certichain-header">
        <div className="logo-container">
          <span className="logo-icon">🎓</span>
          <div className="logo-text-group">
            <span className="logo-title">CertiChain</span>
            <span className="logo-subtitle">AI-Powered Certification</span>
          </div>
        </div>
        <ConnectButton />
      </header>

      {/* Main Content */}
      <main className="certichain-main">
        <div className="hero-banner">
          <h1 className="main-title">
            Decentralized <span className="highlight-text">Certification Platform</span>
          </h1>
          <p className="main-subtitle">
            Issue tamper-proof certificates as NFTs with AI-powered validation on OneChain
          </p>
        </div>

        {account ? (
          <div className="content-wrapper">
            <div className="certificate-form-card">
              <div className="form-header">
                <h2>Issue New Certificate</h2>
                <p>Create a blockchain-verified credential</p>
              </div>

              <div className="form-grid">
                <div className="form-field full-width">
                  <label>Recipient Address *</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={formData.recipient}
                    onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="form-field">
                  <label>Certificate Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Bachelor of Science"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="form-field">
                  <label>Institution *</label>
                  <input
                    type="text"
                    placeholder="e.g., MIT"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="form-field full-width">
                  <label>Description</label>
                  <textarea
                    placeholder="Certificate description..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={loading}
                    rows={3}
                  />
                </div>

                <div className="form-field">
                  <label>Certificate Hash</label>
                  <input
                    type="text"
                    placeholder="SHA-256 hash"
                    value={formData.hash}
                    onChange={(e) => setFormData({ ...formData, hash: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="form-field">
                  <label>Metadata URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.metadataUrl}
                    onChange={(e) => setFormData({ ...formData, metadataUrl: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                onClick={issueCertificate}
                disabled={loading}
                className="submit-btn"
              >
                {loading ? 'Issuing Certificate...' : 'Issue Certificate'}
              </button>

              {message && (
                <div className={`status-message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </div>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">🔐</div>
                <h3>Tamper-Proof</h3>
                <p>Certificates stored immutably on blockchain</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🤖</div>
                <h3>AI Validation</h3>
                <p>Automated fraud detection and verification</p>
              </div>
              <div className="info-card">
                <div className="info-icon">✨</div>
                <h3>NFT Credentials</h3>
                <p>Portable and universally verifiable</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="connect-section">
            <div className="connect-card">
              <div className="connect-icon-large">🔑</div>
              <h2>Connect Wallet to Continue</h2>
              <p>Connect your OneChain wallet to issue and verify certificates</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="certichain-footer">
        <p>© 2024 CertiChain • Secured by OneChain Blockchain</p>
      </footer>
    </div>
  );
}

export default App;
