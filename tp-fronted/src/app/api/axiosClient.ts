// src/app/api/axiosClient.ts
import axios from 'axios';
import { config } from '../config/env'; // asegurate que esta ruta sea correcta

const axiosService = axios.create({
  baseURL: config.BaseUrl, // Podés configurar esto en env.ts
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token; // o `Bearer ${token}` si el backend lo requiere
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken; // si necesitas enviar el refresh token en los headers
  }

  return config;
});

export default axiosService;
