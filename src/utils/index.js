export const buildURLWithFilters = (baseURL, filters) => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value);
    }
  });

  return `${baseURL}?${queryParams.toString()}`;
};
