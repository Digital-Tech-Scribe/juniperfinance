import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Profile API
export const getProfile = async () => {
  const response = await axios.get(`${API}/profile`);
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.put(`${API}/profile`, data);
  return response.data;
};

// Testimonials API
export const getTestimonials = async () => {
  const response = await axios.get(`${API}/testimonials`);
  return response.data;
};

export const createTestimonial = async (data) => {
  const response = await axios.post(`${API}/testimonials`, data);
  return response.data;
};

// Insights API
export const getInsights = async () => {
  const response = await axios.get(`${API}/insights`);
  return response.data;
};

export const getInsight = async (id) => {
  const response = await axios.get(`${API}/insights/${id}`);
  return response.data;
};

// Performance API
export const getPerformance = async () => {
  const response = await axios.get(`${API}/performance`);
  return response.data;
};

// Contact API
export const submitContact = async (data) => {
  const response = await axios.post(`${API}/contacts`, data);
  return response.data;
};

// Seed database
export const seedDatabase = async () => {
  const response = await axios.post(`${API}/seed`);
  return response.data;
};
