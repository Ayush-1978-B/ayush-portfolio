import React, { useEffect, useState } from 'react';
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
    <div id="hire-me" className="hire-me-page">
      <div className="hire-me-card-container">
        <ProfileCard
          avatarUrl="/images/ayush.png"
          status="online"
          contactText="Contact Me"
        />
      </div>
      <div className="hire-me-form-container">
        <h2 className="text-3xl font-extrabold text-center mb-8 form-field" style={{ animationDelay: '0.1s' }}>Let's Work Together</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form-field" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="fullName"
                id="full-name"
                autoComplete="name"
                required
                value={form.fullName}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md bg-gray-800 border-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          <div className="form-field" style={{ animationDelay: '0.3s' }}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md bg-gray-800 border-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          <div className="form-field" style={{ animationDelay: '0.4s' }}>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
              Phone Number <span className="text-gray-500">(optional)</span>
            </label>
            <div className="mt-1">
              <input
                type="tel"
                name="phone"
                id="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md bg-gray-800 border-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          <div className="form-field" style={{ animationDelay: '0.5s' }}>
            <label htmlFor="company" className="block text-sm font-medium text-gray-400">
              Company/Organization <span className="text-gray-500">(if applicable)</span>
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="company"
                id="company"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md bg-gray-800 border-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          <div className="form-field" style={{ animationDelay: '0.6s' }}>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-400">Preferred Communication</legend>
              <div className="mt-2 space-y-2 sm:space-y-0 sm:flex sm:space-x-4">
                <div className="flex items-center">
                  <input id="com-email" name="communication" type="radio" value="Email" checked={form.communication === 'Email'} onChange={handleChange} className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700" />
                  <label htmlFor="com-email" className="ml-3 block text-sm font-medium text-gray-300">Email</label>
                </div>
                <div className="flex items-center">
                  <input id="com-phone" name="communication" type="radio" value="Phone" checked={form.communication === 'Phone'} onChange={handleChange} className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700" />
                  <label htmlFor="com-phone" className="ml-3 block text-sm font-medium text-gray-300">Phone</label>
                </div>
                <div className="flex items-center">
                  <input id="com-video" name="communication" type="radio" value="Video Call" checked={form.communication === 'Video Call'} onChange={handleChange} className="focus:ring-pink-500 h-4 w-4 text-pink-600 border-gray-700" />
                  <label htmlFor="com-video" className="ml-3 block text-sm font-medium text-gray-300">Video Call</label>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="form-field" style={{ animationDelay: '0.7s' }}>
            <label htmlFor="best-time" className="block text-sm font-medium text-gray-400">
              Best time to reach out
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="bestTime"
                id="best-time"
                value={form.bestTime}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-md bg-gray-800 border-gray-700 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          </div>

          <div className="form-field" style={{ animationDelay: '0.8s' }}>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 submit-btn-animated"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
            {success && <div className="text-green-400 mt-2">Request sent successfully!</div>}
            {error && <div className="text-red-400 mt-2">{error}</div>}
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default HireMe;