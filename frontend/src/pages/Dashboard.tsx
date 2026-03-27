import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@onelabs/dapp-kit';
import { Transaction } from '@onelabs/sui/transactions';
import '../styles/Dashboard.css';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;
const REGISTRY_ID = import.meta.env.VITE_REGISTRY_ID;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface Certificate {
  id: string;
  recipient: string;
  title: string;
  institution: string;
  issue_date: number;
  ai_verified: boolean;
  verification_score: number;
}

function Dashboard() {
  const navigate = useNavigate();
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const suiClient = useSuiClient();
  
  const [activeTab, setActiveTab] = useState<'issue' | 'mycerts' | 'analytics'>('issue');
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
  const [isRegistered, setIsRegistered] = useState(false);
  const [institutionName, setInstitutionName] = useState('');
  const [myCertificates, setMyCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (!account) {
      navigate('/');
    } else {
      checkRegistration();
      fetchMyCertificates();
    }
  }, [account, navigate]);

  const checkRegistration = async () => {
    // Dummy check - in real app, query blockchain
    setIsRegistered(true);
  };

  const fetchMyCertificates = async () => {
    // Dummy data for demonstration
    setMyCertificates([
      {
        id: '0x123...abc',
        recipient: '0x456...def',
        title: 'Blockchain Development Certificate',
        institution: 'OneChain Academy',
        issue_date: Date.now() - 86400000,
        ai_verified: true,
        verification_score: 95
      },
      {
        id: '0x789...ghi',
        recipient: '0x012...jkl',
        title: 'Smart Contract Security',
        institution: 'OneChain Academy',
        issue_date: Date.now() - 172800000,
        ai_verified: true,
        verification_score: 92
      }
    ]);
  };

  const registerIssuer = async () => {
    if (!institutionName.trim()) {
      setMessage('Please enter institution name');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::certification::register_issuer`,
        arguments: [
          tx.object(REGISTRY_ID),
          tx.pure.string(institutionName),
        ],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: () => {
            setMessage('✅ Registered successfully!');
            setIsRegistered(true);
            setInstitutionName('');
          },
          onError: (error) => {
            console.error('Error:', error);
            setMessage('❌ Registration failed');
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
          onSuccess: () => {
            setMessage('✅ Certificate issued successfully!');
            setFormData({
              recipient: '',
              title: '',
              description: '',
              institution: '',
              hash: '',
              metadataUrl: '',
            });
            setTimeout(() => fetchMyCertificates(), 2000);
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
    <div className="certichain-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => navigate('/')}>
            <span className="logo-icon">🎓</span>
            <span className="logo-text">CertiChain</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'issue' ? 'active' : ''}`}
            onClick={() => setActiveTab('issue')}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Issue Certificate</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'mycerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('mycerts')}
          >
            <span className="nav-icon">📜</span>
            <span className="nav-label">My Certificates</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Analytics</span>
          </button>
          <div className="nav-divider"></div>
          <button 
            className="nav-item"
            onClick={() => navigate('/explore')}
          >
            <span className="nav-icon">🔍</span>
            <span className="nav-label">Explore</span>
          </button>
          <button 
            className="nav-item"
            onClick={() => navigate('/verify')}
          >
            <span className="nav-icon">✅</span>
            <span className="nav-label">Verify</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={() => navigate('/')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Home</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>
              {activeTab === 'issue' && 'Issue Certificate'}
              {activeTab === 'mycerts' && 'My Certificates'}
              {activeTab === 'analytics' && 'Analytics'}
            </h1>
          </div>
          <div className="header-right">
            <ConnectButton />
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          {!isRegistered ? (
            <div className="register-section">
              <div className="register-card">
                <div className="card-icon-large">🏛️</div>
                <h2>Register as Certificate Issuer</h2>
                <p>Register your institution to start issuing certificates</p>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter institution name"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    disabled={loading}
                    className="register-input"
                  />
                  <button
                    onClick={registerIssuer}
                    disabled={loading || !institutionName.trim()}
                    className="btn-register"
                  >
                    {loading ? 'Registering...' : 'Register Institution'}
                  </button>
                </div>
                {message && (
                  <div className={`alert ${message.includes('✅') ? 'success' : 'error'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'issue' && (
                <div className="issue-tab">
                  <div className="certificate-form">
                    <div className="form-section">
                      <h3>Recipient Information</h3>
                      <div className="form-row">
                        <div className="form-field full">
                          <label>Recipient Wallet Address *</label>
                          <input
                            type="text"
                            placeholder="0x..."
                            value={formData.recipient}
                            onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Certificate Details</h3>
                      <div className="form-row">
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
                          <label>Institution Name *</label>
                          <input
                            type="text"
                            placeholder="e.g., MIT"
                            value={formData.institution}
                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-field full">
                          <label>Description</label>
                          <textarea
                            placeholder="Certificate description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            disabled={loading}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Additional Information</h3>
                      <div className="form-row">
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
                    </div>

                    <button
                      onClick={issueCertificate}
                      disabled={loading}
                      className="btn-issue"
                    >
                      {loading ? 'Issuing Certificate...' : '🎓 Issue Certificate'}
                    </button>

                    {message && (
                      <div className={`alert ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                      </div>
                    )}
                  </div>

                  <div className="quick-stats">
                    <div className="stat-card-dash">
                      <div className="stat-icon-dash">📜</div>
                      <div className="stat-info">
                        <div className="stat-value-dash">{myCertificates.length}</div>
                        <div className="stat-label-dash">Total Issued</div>
                      </div>
                    </div>
                    <div className="stat-card-dash">
                      <div className="stat-icon-dash">✅</div>
                      <div className="stat-info">
                        <div className="stat-value-dash">
                          {myCertificates.filter(c => c.ai_verified).length}
                        </div>
                        <div className="stat-label-dash">Verified</div>
                      </div>
                    </div>
                    <div className="stat-card-dash">
                      <div className="stat-icon-dash">⭐</div>
                      <div className="stat-info">
                        <div className="stat-value-dash">
                          {myCertificates.length > 0 
                            ? Math.round(myCertificates.reduce((sum, c) => sum + c.verification_score, 0) / myCertificates.length)
                            : 0}
                        </div>
                        <div className="stat-label-dash">Avg Score</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mycerts' && (
                <div className="mycerts-tab">
                  {myCertificates.length > 0 ? (
                    <div className="certificates-grid">
                      {myCertificates.map((cert) => (
                        <div key={cert.id} className="cert-card">
                          <div className="cert-card-header">
                            <div className="cert-icon">🎓</div>
                            {cert.ai_verified && (
                              <div className="verified-badge">✓ Verified</div>
                            )}
                          </div>
                          <h3>{cert.title}</h3>
                          <p className="cert-institution">{cert.institution}</p>
                          <p className="cert-recipient">
                            To: {cert.recipient.slice(0, 6)}...{cert.recipient.slice(-4)}
                          </p>
                          <div className="cert-footer">
                            <div className="cert-date">
                              {new Date(cert.issue_date).toLocaleDateString()}
                            </div>
                            <div className="cert-score">
                              Score: {cert.verification_score}/100
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">📜</div>
                      <h3>No Certificates Yet</h3>
                      <p>Start issuing certificates to see them here</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="analytics-tab">
                  <div className="analytics-grid">
                    <div className="analytics-card">
                      <h3>Issuance Trend</h3>
                      <div className="chart-placeholder">
                        <div className="chart-bar" style={{ height: '60%' }}></div>
                        <div className="chart-bar" style={{ height: '80%' }}></div>
                        <div className="chart-bar" style={{ height: '70%' }}></div>
                        <div className="chart-bar" style={{ height: '90%' }}></div>
                        <div className="chart-bar" style={{ height: '100%' }}></div>
                      </div>
                    </div>
                    <div className="analytics-card">
                      <h3>Verification Rate</h3>
                      <div className="percentage-display">
                        <div className="percentage-value">
                          {myCertificates.length > 0 
                            ? Math.round((myCertificates.filter(c => c.ai_verified).length / myCertificates.length) * 100)
                            : 0}%
                        </div>
                        <div className="percentage-label">AI Verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
