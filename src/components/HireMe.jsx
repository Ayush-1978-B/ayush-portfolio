import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './glowingcard/glowing';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileCard
            avatarUrl="/images/ayush.png"
            status="online"
            contactText="Contact Me"
          />
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
            <fieldset>
              <legend className="block text-sm font-medium text-gray-300 mb-3">Preferred Communication</legend>
              <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-6">
                <div className="flex items-center">
                  <input 
                    id="com-email" 
                    name="communication" 
                    type="radio" 
                    value="Email" 
                    checked={form.communication === 'Email'} 
                    onChange={handleChange} 
                    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700 bg-gray-800" 
                  />
                  <label htmlFor="com-email" className="ml-3 block text-sm font-medium text-gray-300">Email</label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="com-phone" 
                    name="communication" 
                    type="radio" 
                    value="Phone" 
                    checked={form.communication === 'Phone'} 
                    onChange={handleChange} 
                    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700 bg-gray-800" 
                  />
                  <label htmlFor="com-phone" className="ml-3 block text-sm font-medium text-gray-300">Phone</label>
                </div>
                <div className="flex items-center">
                  <input 
                    id="com-video" 
                    name="communication" 
                    type="radio" 
                    value="Video Call" 
                    checked={form.communication === 'Video Call'} 
                    onChange={handleChange} 
                    className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700 bg-gray-800" 
                  />
                  <label htmlFor="com-video" className="ml-3 block text-sm font-medium text-gray-300">Video Call</label>
                </div>
              </div>
            </fieldset>
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <label htmlFor="best-time" className="block text-sm font-medium text-gray-300 mb-2">
              Best time to reach out
            </label>
            <input
              type="text"
              name="bestTime"
              id="best-time"
              value={form.bestTime}
              onChange={handleChange}
              className="block w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300"
              placeholder="e.g., Weekdays 9 AM - 5 PM"
            />
          </motion.div>

          <motion.div 
            className="form-field"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </motion.button>
            
            {success && (
              <motion.div 
                className="text-green-400 mt-3 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Request sent successfully!
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                className="text-red-400 mt-3 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default HireMe;