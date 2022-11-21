import axios from "axios";


const isProduction = import.meta.env.PROD;


axios.defaults.baseURL = isProduction ? import.meta.env.VITE_PRODUCTION_URL : import.meta.env.VITE_DEVELOPMENT_URL;

const axiosPrivateInstance = (token) => {
  return axios.create({
    baseURL: isProduction
      ? import.meta.env.VITE_PRODUCTION_URL
      : import.meta.env.VITE_DEVELOPMENT_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosPrivateInstance;