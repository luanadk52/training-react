import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - runs before every request
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
api.interceptors.response.use(
  (response) => {
    console.log(`Response received: ${response.status} from ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.message);
    return Promise.reject(error);
  }
);

// API methods organized by feature
export const userAPI = {
  // Get all users
  getAllUsers: () => api.get('/users'),
  
  // Get single user by id
  getUserById: (id) => api.get(`/users/${id}`),
  
  // Get user posts
  getUserPosts: (userId) => api.get(`/users/${userId}/posts`),
  
  // Get user albums
  getUserAlbums: (userId) => api.get(`/users/${userId}/albums`),
};

export default api;
