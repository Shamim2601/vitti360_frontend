import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conf from '../conf/conf';
import { FiSearch, FiClock, FiUser, FiTag } from 'react-icons/fi';

const CircularCard = ({ circular }) => {
  const formattedDate = new Date(circular.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {circular.category}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <FiClock className="mr-1" />
          {formattedDate}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{circular.title}</h3>
      <p className="text-gray-600 mb-4">{circular.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <FiUser className="mr-1" />
          {circular.author}
        </div>
        <a href={circular.url} target="_blank" rel="noopener noreferrer">
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Link →
          </button>
        </a>
      </div>
    </div>
  );
};

const Circulars = () => {
  const [circulars, setCirculars] = useState([]);
  const [filteredCirculars, setFilteredCirculars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCirculars = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${conf.apiUrl}/api/circulars/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCirculars(response.data);
        setFilteredCirculars(response.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(circular => circular.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch circulars');
        setLoading(false);
      }
    };

    fetchCirculars();
  }, []);

  useEffect(() => {
    let filtered = [...circulars];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(circular => circular.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(circular =>
        circular.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCirculars(filtered);
  }, [selectedCategory, searchQuery, circulars]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Circulars</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <FiTag className="text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <p className="text-gray-600 mb-6">
        Showing {filteredCirculars.length} {filteredCirculars.length === 1 ? 'circular' : 'circulars'}
      </p>

      {/* Circulars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCirculars.map(circular => (
          <CircularCard key={circular.id} circular={circular} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCirculars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No circulars found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Circulars;