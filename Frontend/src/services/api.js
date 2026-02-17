import axios from 'axios';

const API = axios.create({
  baseURL: 'https://svgmsmeme.onrender.com/api',
});

// Automatically add the Auth token to every private request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// FIXED: Using axios 'params' for cleaner query string management
export const fetchMemes = (category = null) => {
  const params = {
    page: 1,
    limit: 100
  };

  // Only add category if it's a valid string
  if (category && category !== 'null') {
    params.category = category;
  }

  return API.get('/memes', { params });
};

export const upvoteMeme = (id) => API.patch(`/memes/${id}/upvote`);
export const getLeaderboard = () => API.get('/users/leaderboard');
export const loginUser = (formData) => API.post('/users/login', formData);