import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Explore() {
  const navigate = useNavigate();

  const certificates = [
    {
      id: '1',
      title: 'Blockchain Development Certificate',
      institution: 'OneChain Academy',
      recipient: '0x1234...5678',
      verified: true,
      score: 95,
    },
    {
      id: '2',
      title: 'Smart Contract Security',
      institution: 'Web3 University',
      recipient: '0x8765...4321',
      verified: true,
      score: 92,
    },
    {
      id: '3',
      title: 'DeFi Fundamentals',
      institution: 'Crypto Institute',
      recipient: '0xabcd...efgh',
      verified: true,
      score: 88,
    },
  ];

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
          </motion.div>

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
                <p className="text-xs text-gray-500 font-mono mb-3">{cert.recipient}</p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-400">AI Score</span>
                  <span className="text-sm font-bold text-gradient">{cert.score}/100</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
