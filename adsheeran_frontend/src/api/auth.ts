import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signup = (email: string, password: string) => {
  return axios.post(`${BASE_URL}/auth/signup`, { email, password });
};

export const login = (email: string, password: string) => {
  return axios.post(`${BASE_URL}/auth/login`, { email, password });
};
