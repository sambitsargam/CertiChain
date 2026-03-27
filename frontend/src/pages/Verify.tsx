import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Verify() {
  const navigate = useNavigate();
  const [certificateId, setCertificateId] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!certificateId.trim()) return;
    
    setVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setResult({
        verified: true,
        title: 'Blockchain Development Certificate',
        institution: 'OneChain Academy',
        recipient: '0x1234...5678',
        issueDate: 'March 15, 2026',
        score: 95,
      });
      setVerifying(false);
    }, 1500);
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
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-3">
              Verify <span className="text-gradient">Certificate</span>
            </h1>
            <p className="text-lg text-gray-400">Check the authenticity of any certificate</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8"
          >
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Certificate ID or Hash</label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID or transaction hash..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={verifying || !certificateId.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              {verifying ? 'Verifying...' : 'Verify Certificate'}
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 glass rounded-xl border-2 border-green-500/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">✅</span>
                  <div>
                    <h3 className="text-xl font-bold text-green-500">Verified Certificate</h3>
                    <p className="text-sm text-gray-400">This certificate is authentic</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Title:</span>
                    <span className="font-medium">{result.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Institution:</span>
                    <span className="font-medium">{result.institution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recipient:</span>
                    <span className="font-mono text-sm">{result.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issue Date:</span>
                    <span className="font-medium">{result.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Verification Score:</span>
                    <span className="font-bold text-gradient">{result.score}/100</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
