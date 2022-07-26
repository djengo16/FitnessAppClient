const httpParamsBuilder = (search, page, count) => {
  const config = {
    params: { page, count },
  };

  if (search) {
    config.params.search = search;
  }
  return config;
};
export default httpParamsBuilder;
