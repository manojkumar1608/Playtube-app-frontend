import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.example.com', // Your backend API base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include credentials with requests if needed
});

export default instance;