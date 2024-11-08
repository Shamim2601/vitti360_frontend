import React, { useState } from 'react';

const Support = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('job');
  const [message, setMessage] = useState('');

  const contactInfo = {
    whatsapp: `https://wa.me/8801533749463?text=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20I%20need%20help%20with%20${category}.%20Here%20is%20my%20message:%20${encodeURIComponent(message)}`,
    messenger: 'https://m.me/samamun60',
    email: `mailto:shamim2601@gmail.com?subject=Support%20Request&body=Hello,%20my%20name%20is%20${encodeURIComponent(name)}.%20I%20need%20help%20with%20${category}.%20Here%20is%20my%20message:%20${encodeURIComponent(message)}`,
  };

  const handleContact = (method) => {
    window.open(contactInfo[method], '_blank');
  };

  return (
    <div className="mt-4 mx-2 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
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
        <div className="flex items-center space-x-4">
          <label className="font-semibold">Category:</label>
          <label>
            <input
              type="radio"
              value="job"
              checked={category === 'job'}
              onChange={() => setCategory('job')}
            />
            <span className="ml-1">Job</span>
          </label>
          <label>
            <input
              type="radio"
              value="admission"
              checked={category === 'admission'}
              onChange={() => setCategory('admission')}
            />
            <span className="ml-1">Admission</span>
          </label>
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="আপনার কি সহায়তা প্রয়োজন সেটা লিখুন"
          />
        </div>
      </form>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleContact('whatsapp')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          WhatsApp
        </button>
        <button
          onClick={() => handleContact('messenger')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Messenger
        </button>
        <button
          onClick={() => handleContact('email')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Email
        </button>
      </div>
    </div>
  );
};

export default Support;
