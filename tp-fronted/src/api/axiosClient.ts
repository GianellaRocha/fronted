
import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'https://api.ejemplo.com', // Cambiar por tu baseURL real
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request
axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = token; // O usar: `Bearer ${token}` si el backend lo requiere
  }
  return config;
});

export default axiosService;
