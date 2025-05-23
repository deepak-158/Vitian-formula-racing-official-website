/**
 * Contact Form Service
 * Stores contact form submissions in localStorage
 */

import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const CONTACT_API = `${API_URL}/contact`;

/**
 * Save a new contact form submission to Google Form
 * @param {Object} formData - The form data to save
 * @returns {Promise} - Resolves with success message or rejects with error
 */
export const saveContactSubmission = async (formData) => {
  try {
    // Open the Google Form directly
    // This is the most reliable way to submit the form
    window.open('https://forms.gle/FTh9Yj6emU3rczer5', '_blank');
    
    return {
      success: true,
      message: 'Contact form opened in a new tab. Please complete your submission there.'
    };
  } catch (error) {
    console.error('Error opening form:', error);
    throw new Error('Failed to open contact form. Please try again later.');
  }
};

/**
 * Get all contact form submissions
 */
export const getContactSubmissions = async () => {
  // Open Google Form responses in a new tab
  window.open('https://docs.google.com/forms/d/1FAIpQLSfkTukGXdGhWI-KUcbODVHd3-l8p9XOX5_59mqtVzPCH2qiuQ/edit#responses', '_blank');
  return [];
};

/**
 * Clear all contact form submissions
 */
export const clearContactSubmissions = async () => {
  console.warn('clearContactSubmissions is not supported with Google Forms');
  return true;
};

/**
 * Open WhatsApp chat with the team
 */
export const openWhatsAppChat = () => {
  window.open('https://wa.me/917024043090', '_blank');
  return true;
}; 