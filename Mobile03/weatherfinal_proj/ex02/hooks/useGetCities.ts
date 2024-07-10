export const fetchCities = async (value: string) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
    );
    const data = await response.json();
    if (data)
      return data.results || [];
  } catch (error) {
    console.error(error);
  }
};
