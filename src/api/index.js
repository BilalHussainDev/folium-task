import axios from "axios";

// const baseUrl = import.meta.env.VITE_API_BASE_URL;
// const apiKey = import.meta.env.VITE_API_KEY;

const baseUrl = "https://www.dummyalphavintage.co/";
const apiKey = "12345678";

export const api = axios.create({
  baseURL: baseUrl,
});

// Add the apikey to all requests as a query param
api.interceptors.request.use((config) => {
  config.params = {
    ...(config.params || {}),
    apikey: apiKey,
  };
  return config;
});
