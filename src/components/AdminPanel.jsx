import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { FaEnvelope, FaPhone, FaBuilding, FaClock, FaTrash, FaSignOutAlt, FaUser, FaComments, FaBriefcase } from 'react-icons/fa';

const AdminPanel = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [hireMeRequests, setHireMeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contact');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      // Fetch contact messages
      const contactQuery = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const contactSnapshot = await getDocs(contactQuery);
      const contactData = contactSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        };
      });
      setContactMessages(contactData);
      // Fetch hire me requests
      const hireMeQuery = query(collection(db, 'hireMeRequests'), orderBy('createdAt', 'desc'));
      const hireMeSnapshot = await getDocs(hireMeQuery);
      const hireMeData = hireMeSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
        };
      });
      setHireMeRequests(hireMeData);
    } catch (error) {
      setError('Failed to fetch data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      if (collectionName === 'contactMessages') {
        setContactMessages(prev => prev.filter(msg => msg.id !== docId));
      } else {
        setHireMeRequests(prev => prev.filter(req => req.id !== docId));
      }
    } catch (error) {
      setError('Failed to delete item: ' + error.message);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(dateObj);
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <motion.header 
        className="bg-black/80 backdrop-blur-xl border-b border-white/10 p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Admin Access</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </motion.header>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Error Display */}
        {error && (
          <motion.div 
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}
        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FaComments className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Contact Messages</p>
                <p className="text-2xl font-bold text-white">{contactMessages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Hire Me Requests</p>
                <p className="text-2xl font-bold text-white">{hireMeRequests.length}</p>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Tabs */}
        <motion.div 
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'contact'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaComments />
            Contact Messages ({contactMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('hire')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'hire'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <FaBriefcase />
            Hire Me Requests ({hireMeRequests.length})
          </button>
        </motion.div>
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading data...</p>
            </div>
          ) : (
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 overflow-hidden">
              {activeTab === 'contact' ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Name</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Email</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Message</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Date</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {contactMessages.map((message) => (
                        <motion.tr
                          key={message.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-800/30 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-white font-medium">{message.name}</td>
                          <td className="px-6 py-4 text-gray-300">{message.email}</td>
                          <td className="px-6 py-4 text-gray-300 max-w-xs truncate">{message.message}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{formatDate(message.createdAt)}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete('contactMessages', message.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {contactMessages.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      No contact messages yet.
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Name</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Email</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Phone</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Company</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Communication</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Best Time</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Date</th>
                        <th className="px-6 py-4 text-left text-gray-300 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {hireMeRequests.map((request) => (
                        <motion.tr
                          key={request.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-800/30 transition-colors duration-200"
                        >
                          <td className="px-6 py-4 text-white font-medium">{request.fullName}</td>
                          <td className="px-6 py-4 text-gray-300">{request.email}</td>
                          <td className="px-6 py-4 text-gray-300">{request.phone}</td>
                          <td className="px-6 py-4 text-gray-300">{request.company}</td>
                          <td className="px-6 py-4 text-gray-300">{request.communication}</td>
                          <td className="px-6 py-4 text-gray-300">{request.bestTime}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{formatDate(request.createdAt)}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete('hireMeRequests', request.id)}
                              className="text-red-400 hover:text-red-300 transition-colors duration-200"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {hireMeRequests.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      No hire me requests yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel; 