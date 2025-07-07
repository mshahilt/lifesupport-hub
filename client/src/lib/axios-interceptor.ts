import apiClient from './axios';

export const setupAxiosInterceptors = (getToken: () => string | null) => {
  const reqInterceptor = apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      console.log("from interceptor", token);
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const resInterceptor = apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized – maybe redirect to login');
      }
      return Promise.reject(error);
    }
  );

  return () => {
    apiClient.interceptors.request.eject(reqInterceptor);
    apiClient.interceptors.response.eject(resInterceptor);
  };
};
