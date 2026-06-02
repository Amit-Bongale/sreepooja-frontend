export const getData = async (path) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${path}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};



