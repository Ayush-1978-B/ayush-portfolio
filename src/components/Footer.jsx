import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/Ayush-1978-B',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/ayush-yadav-dev',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/ayush_dev',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:ayush.yadav@example.com',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <footer className="w-full mt-20 px-4 sm:px-6 lg:px-8 py-10 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 mb-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 bg-zinc-800/50 border border-zinc-700/50 rounded-xl flex items-center justify-center text-zinc-400 transition-all duration-300 ${social.color} hover:border-pink-500/50 hover:scale-110`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-zinc-400 text-sm sm:text-base">
            <p>© {currentYear} Ayush Yadav. All rights reserved.</p>
            <p className="mt-2 text-zinc-500 text-xs sm:text-sm">
              Built with React, Three.js, and lots of ☕
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;