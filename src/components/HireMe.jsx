import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const HireMe = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    communication: '',
    bestTime: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await addDoc(collection(db, 'hireMeRequests'), {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        communication: form.communication,
        bestTime: form.bestTime,
        createdAt: new Date(),
      });
      setSuccess(true);
      setForm({ fullName: '', email: '', phone: '', company: '', communication: '', bestTime: '' });
    } catch (err) {
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      id="hire-me" 
      className="hire-me-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="hire-me-card-container">
        <motion.div
          className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Profile Image */}
          <div className="text-center mb-6">
            <motion.div
              className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-pink-500/30"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/ayush.png"
                alt="Ayush Yadav"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Ayush Yadav</h3>
            <p className="text-pink-400 font-semibold">Full Stack Developer</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Available for work</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <FaEnvelope className="w-4 h-4 text-pink-400" />
              <span className="text-sm">ayush.yadav@example.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaPhone className="w-4 h-4 text-pink-400" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FaMapMarkerAlt className="w-4 h-4 text-pink-400" />
              <span className="text-sm">Remote / Worldwide</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://linkedin.com/in/ayush-yadav-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://github.com/Ayush-1978-B"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hire-me-form-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-extrabold text-center mb-6 md:mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Let's Work Together
        </motion.h2>
        
        {success && (
          <motion.div
            className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Thank you! Your message has been sent successfully. I'll get back to you soon!
          </motion.div>
        )}

        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.form 
          className="space-y-4 md:space-y-6" 
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="full-name"
              autoComplete="name"
              required
              value={form.fullName}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your full name"
            />
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your email address"
            />
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number <span className="text-gray-500 text-xs">(optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your phone number"
            />
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company/Organization <span className="text-gray-500 text-xs">(if applicable)</span>
            </label>
            <input
              type="text"
              name="company"
              id="company"
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter company name"
            />
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="communication" className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Communication Method
            </label>
            <select
              name="communication"
              id="communication"
              value={form.communication}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white transition-all duration-300"
            >
              <option value="">Select preferred method</option>
              <option value="email">Email</option>
              <option value="phone">Phone Call</option>
              <option value="video">Video Call</option>
              <option value="message">Message</option>
            </select>
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="best-time" className="block text-sm font-medium text-gray-300 mb-2">
              Best Time to Contact
            </label>
            <select
              name="bestTime"
              id="best-time"
              value={form.bestTime}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white transition-all duration-300"
            >
              <option value="">Select best time</option>
              <option value="morning">Morning (9 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 8 PM)</option>
              <option value="night">Night (8 PM - 11 PM)</option>
            </select>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="submit-btn-animated w-full py-4 px-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default HireMe;