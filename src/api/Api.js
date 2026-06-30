import { notify } from "../Utils/notify";

export const getData = async (path) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${path}`,
      {
        method: "GET",
        headers:{
          Authorization: localStorage.getItem("token"),
        }
      },
    );
    if (!response.ok) {
      const data = await response.json();
      notify(data.message)
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};



