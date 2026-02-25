import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default axiosClient;
