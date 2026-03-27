import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSuiClient } from '@onelabs/dapp-kit';

const PACKAGE_ID = import.meta.env.VITE_PACKAGE_ID;

interface Certificate {
  id: string;
  title: string;
  institution: string;
  recipient: string;
  verified: boolean;
  score: number;
  issueDate: number;
}

function Explore() {
  const navigate = useNavigate();
  const suiClient = useSuiClient();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCertificates();
  }, []);

  const fetchAllCertificates = async () => {
    setLoading(true);
    try {
      // Fetch all certificate events
      const events = await suiClient.queryEvents({
        query: {
          MoveEventType: `${PACKAGE_ID}::certification::CertificateIssued`
        },
        limit: 50,
      });

      const certs: Certificate[] = events.data.map((event: any) => {
        const eventData = event.parsedJson;
        return {
          id: eventData.certificate_id || event.id.txDigest,
          title: eventData.title || 'Certificate',
          institution: eventData.institution || 'Unknown Institution',
          recipient: eventData.recipient,
          verified: true,
          score: 85, // Default AI score
          issueDate: parseInt(eventData.timestamp) || Date.now(),
        };
      });

      setCertificates(certs);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-3xl">🎓</span>
            <span className="text-xl font-bold text-gradient">CertiChain</span>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            ← Back
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-3">
              Explore <span className="text-gradient">Certificates</span>
            </h1>
            <p className="text-lg text-gray-400">Browse verified credentials on the blockchain</p>
            <p className="text-sm text-gray-500 mt-2">{certificates.length} certificates found</p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400">Loading certificates...</p>
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">🎓</span>
                    {cert.verified && (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500 rounded-full text-xs text-green-500">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-400 mb-1">{cert.institution}</p>
                  <p className="text-xs text-gray-500 font-mono mb-3">
                    {cert.recipient.slice(0, 6)}...{cert.recipient.slice(-4)}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-xs text-gray-400">AI Score</span>
                    <span className="text-sm font-bold text-gradient">{cert.score}/100</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-2xl font-bold mb-2">No Certificates Yet</h3>
              <p className="text-gray-400 mb-6">Be the first to issue a certificate!</p>
              <button
                onClick={() => navigate('/app')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold"
              >
                Issue Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
