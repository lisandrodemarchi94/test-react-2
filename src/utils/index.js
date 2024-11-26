export const buildURLWithFilters = (baseURL, filters) => {
  const queryParams = new URLSearchParams(); // Ayuda a manejar los parámetros de consulta

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value); // Agrega solo los filtros válidos
    }
  });

  return `${baseURL}?${queryParams.toString()}`; // Construye la URL final
};
