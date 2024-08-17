import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const createApiClient = (resourceUrl, options) => {
  const axiosConfig = {
    baseURL: BASE_URL + resourceUrl,
  };

  const axiosInstance = axios.create(axiosConfig);

  if (options?.needAuth) {
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accesstoken"
      )}`;
      return config;
    });
  }
  return axiosInstance;
};

export default createApiClient;
