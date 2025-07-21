
import axios from 'axios';
import { config } from '../config/env';

export const axiosService = axios.create({
  baseURL: config.BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});

export const axiosAuthService = axios.create({
  baseURL: config.AuthUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuthService.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (token) {
    config.headers.Authorization = token;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  return config;
});