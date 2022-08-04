const httpParamsBuilder = (props) => {
  const config = {
    params: {},
  };
  Object.keys(props).forEach((key) => {
    if (props[key]) {
      config.params[key] = props[key];
    }
  });

  return config;
};
export default httpParamsBuilder;
