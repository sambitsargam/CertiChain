import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@onelabs/dapp-kit';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Landing() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  const features = [
    {
      icon: '🔐',
      title: 'Tamper-Proof',
      description: 'Certificates stored immutably on OneChain blockchain with cryptographic verification.',
    },
    {
      icon: '🤖',
      title: 'AI Verification',
      description: 'Advanced AI algorithms detect fraud and validate certificate authenticity in real-time.',
    },
    {
      icon: '⚡',
      title: 'Instant Issuance',
      description: 'Issue certificates in seconds with automated blockchain transactions.',
    },
    {
      icon: '🌍',
      title: 'Global Access',
      description: 'Anyone, anywhere can verify certificate authenticity instantly.',
    },
    {
      icon: '📊',
      title: 'Analytics',
      description: 'Track issuance metrics and institutional performance in real-time.',
    },
    {
      icon: '🎨',
      title: 'Custom Design',
      description: 'Beautiful certificates with customizable templates and branding.',
    },
  ];

  const steps = [
    { number: '01', title: 'Register', description: 'Connect wallet and register as issuer', icon: '🏛️' },
    { number: '02', title: 'Issue', description: 'Create and mint certificate NFTs', icon: '📝' },
    { number: '03', title: 'Verify', description: 'AI validates authenticity', icon: '🤖' },
    { number: '04', title: 'Share', description: 'Recipients receive verified credentials', icon: '✅' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10" />
        <motion.div
          className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 200,
            y: mousePosition.y - 200,
          }}
          transition={{ type: 'spring', damping: 30 }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <span className="text-4xl">🎓</span>
            <span className="text-2xl font-bold text-gradient">CertiChain</span>
          </motion.div>
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/verify')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Verify
            </motion.button>
            <ConnectButton />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
              <span className="text-2xl">🤖</span>
              <span className="text-sm font-medium">AI-Powered Verification</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              The Future of
              <br />
              <span className="text-gradient">Digital Credentials</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            >
              Issue, manage, and verify tamper-proof certificates on the blockchain.
              Powered by AI for enhanced security and authenticity validation.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(249, 115, 22, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/app')}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-semibold text-lg flex items-center gap-2 group"
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="px-8 py-4 glass rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Explore Certificates
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            >
              {[
                { value: '10K+', label: 'Certificates Issued' },
                { value: '500+', label: 'Institutions' },
                { value: '99.9%', label: 'AI Accuracy' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Powerful <span className="text-gradient">Dashboard</span>
            </h2>
            <p className="text-xl text-gray-400">Manage everything from one place</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 glow-orange"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '📜', value: '156', label: 'Total Issued', color: 'from-orange-500 to-red-500' },
                { icon: '✅', value: '142', label: 'Verified', color: 'from-green-500 to-emerald-500' },
                { icon: '⭐', value: '94', label: 'Avg Score', color: 'from-blue-500 to-cyan-500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Why Choose <span className="text-gradient">CertiChain</span>?
            </h2>
            <p className="text-xl text-gray-400">The most advanced certification platform</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass rounded-2xl p-8 cursor-pointer group"
              >
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple, secure, and efficient</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-2xl p-8 relative"
              >
                <div className="text-6xl font-bold text-white/10 absolute top-4 right-4">
                  {step.number}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-16 glow-orange"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join hundreds of institutions already using CertiChain
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(249, 115, 22, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/app')}
              className="px-12 py-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-xl"
            >
              Launch Application →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🎓</span>
                <span className="text-xl font-bold text-gradient">CertiChain</span>
              </div>
              <p className="text-gray-400 text-sm">
                Securing credentials on OneChain blockchain
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
              { title: 'Resources', links: ['Documentation', 'API', 'Support'] },
              { title: 'Company', links: ['About', 'Blog', 'Contact'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{col.title}</h4>
                {col.links.map((link, j) => (
                  <div key={j} className="text-gray-400 text-sm mb-2 hover:text-white cursor-pointer transition-colors">
                    {link}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2026 CertiChain. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
              <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
              <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
