export const getCategories = async (path) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${path}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Categories");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
