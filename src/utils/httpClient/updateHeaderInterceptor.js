import headerConfig from "./headerConfig";

const updateHeaderInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers = headerConfig().headers;
      return config;
    },
    (error) => {
      return error;
    }
  );
};

export default updateHeaderInterceptor;
