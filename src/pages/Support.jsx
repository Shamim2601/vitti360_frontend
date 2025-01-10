import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Support = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('job');
  const [message, setMessage] = useState('');
  const [needFormFillup, setNeedFormFillup] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam === 'job' || categoryParam === 'admission') {
      setCategory(categoryParam);
    }
  }, [location]);

  const generateMessage = () => {
    return `Hello, my name is ${name}. My phone number is ${phone}. I need help with ${category}.${needFormFillup ? ' I need support for form fillup.' : ''} Here is my message: ${message}`;
  };

  const contactInfo = {
    whatsapp: `https://wa.me/8801533749463?text=${encodeURIComponent(generateMessage())}`,
    messenger: 'https://m.me/samamun60',
    email: `mailto:shamim2601@gmail.com?subject=Support%20Request&body=${encodeURIComponent(generateMessage())}`,
  };

  const handleContact = (method) => {
    if (method === 'messenger') {
      const messageText = generateMessage();
      
      // Copy to clipboard
      navigator.clipboard.writeText(messageText).then(() => {
        // Create and show alert
        const alert = document.createElement('div');
        alert.innerHTML = `
          <p class="text-lg font-semibold mb-2">মেসেজটি কপি করা হয়েছে।<br>মেসেঞ্জারে গিয়ে পেস্ট করুন</p>
          <p class="text-sm">Message copied to clipboard!<br>Redirecting to Messenger...</p>
        `;
        alert.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2563eb;
          color: white;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          text-align: center;
          max-width: 60%;
          width: 400px;
        `;
        document.body.appendChild(alert);
  
        // Remove alert and redirect after 3 seconds
        setTimeout(() => {
          document.body.removeChild(alert);
          window.open(contactInfo[method], '_blank');
        }, 3000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        // If copying fails, just open Messenger
        window.open(contactInfo[method], '_blank');
      });
    } else {
      window.open(contactInfo[method], '_blank');
    }
  };

  return (
    <div className="my-8 mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Admission and Job Support</h1>
      <form className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="আপনার নাম লিখুন"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="আপনার ফোন নম্বর লিখুন"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="font-semibold">Category:</label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="job"
              checked={category === 'job'}
              onChange={() => setCategory('job')}
              className="form-radio"
            />
            <span className="ml-2">Job</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="admission"
              checked={category === 'admission'}
              onChange={() => setCategory('admission')}
              className="form-radio"
            />
            <span className="ml-2">Admission</span>
          </label>
        </div>
        <div className="flex items-center">
          <label htmlFor="formFillup" className="mr-4">
            ফর্ম ফিলাপ সহায়তার জন্য এখানে টিক দিন
          </label>
          <input
            type="checkbox"
            id="formFillup"
            checked={needFormFillup}
            onChange={(e) => setNeedFormFillup(e.target.checked)}
            className="form-checkbox"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="আপনার কি সহায়তা প্রয়োজন সেটা লিখুন"
            rows="4"
          />
        </div>
      </form>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleContact('whatsapp')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          WhatsApp
        </button>
        <button
          onClick={() => handleContact('messenger')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Messenger
        </button>
        <button
          onClick={() => handleContact('email')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
        >
          Email
        </button>
      </div>
    </div>
  );
};

export default Support;
