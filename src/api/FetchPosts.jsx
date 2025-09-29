import axios from "axios";

export const fetchposts = async () => {
  const data = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/community/`,
    {
      withCredentials: true,
    }
  );
  return data;
};
