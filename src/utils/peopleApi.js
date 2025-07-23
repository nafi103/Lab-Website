// API utility functions for People data
// This file contains functions to interact with MongoDB through your backend API

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all people from the database
 * @returns {Promise<Array>} Array of people objects
 */
export const fetchPeople = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/people`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

/**
 * Fetch a single person by ID
 * @param {string} id - Person ID
 * @returns {Promise<Object>} Person object
 */
export const fetchPersonById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};

/**
 * Create a new person
 * @param {Object} personData - Person data to create
 * @returns {Promise<Object>} Created person object
 */
export const createPerson = async (personData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/people`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

/**
 * Update a person
 * @param {string} id - Person ID
 * @param {Object} personData - Updated person data
 * @returns {Promise<Object>} Updated person object
 */
export const updatePerson = async (id, personData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

/**
 * Delete a person
 * @param {string} id - Person ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deletePerson = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

/**
 * Upload image for a person
 * @param {string} id - Person ID
 * @param {File} imageFile - Image file to upload
 * @returns {Promise<Object>} Upload response with image URL
 */
export const uploadPersonImage = async (id, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch(`${API_BASE_URL}/people/${id}/image`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// MongoDB Schema Example for Backend
/*
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['faculty', 'students', 'staff'],
    required: true
  },
  bio: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  researchInterests: [{
    type: String,
    trim: true
  }],
  linkedIn: {
    type: String,
    trim: true
  },
  googleScholar: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  office: {
    type: String,
    trim: true
  },
  degree: {
    type: String,
    trim: true
  },
  institution: {
    type: String,
    trim: true
  },
  joinDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Person', personSchema);
*/
