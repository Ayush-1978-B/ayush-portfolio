import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Title from "../Title";
import GlowCard from "../GlowCard";
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: form.name,
        email: form.email,
        message: form.message,
        createdAt: new Date(),
      });
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      value: "yadavayush535353@gmail.com",
      link: "mailto:yadavayush535353@gmail.com"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      value: "+91 6307397947",
      link: "tel:+916307397947"
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: "Location",
      value: "India",
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ayush-yadav-0a259b326/",
      color: "hover:text-blue-400"
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com/Ayush-1978-B",
      color: "hover:text-gray-400"
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      name: "Instagram",
      url: "https://www.instagram.com/ayush.1978soul/",
      color: "hover:text-pink-400"
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      name: "Twitter",
      url: "https://x.com/ayushyadav_1978",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="flex-center section-padding scroll-mt-20 pt-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title
          title="Get in Touch – Let's Connect"
          sub="Have questions or ideas? Let's talk!"
        />
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <GlowCard className="card-border rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Send me a message</h3>
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your name"
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
                    placeholder="Enter your email"
                  />
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-gray-400 transition-all duration-300 resize-none text-sm md:text-base"
                    placeholder="How can I help you?"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  disabled={loading}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>

                {success && (
                  <motion.div 
                    className="text-green-400 text-center text-sm md:text-base"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Message sent successfully!
                  </motion.div>
                )}
                
                {error && (
                  <motion.div 
                    className="text-red-400 text-center text-sm md:text-base"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}
              </motion.form>
            </GlowCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400">
                    {info.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-300">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-white hover:text-pink-400 transition-colors duration-300 text-sm md:text-base"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm md:text-base">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-400 group-hover:bg-pink-500/30 transition-colors duration-300">
                      {social.icon}
                    </div>
                    <span className="text-white group-hover:text-pink-400 transition-colors duration-300 text-sm md:text-base font-medium">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div
              className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h4 className="text-white font-medium text-sm md:text-base">Available for new opportunities</h4>
              </div>
              <p className="text-gray-300 text-xs md:text-sm">
                I'm currently open to freelance work and full-time positions. Let's discuss your project!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;