import axios from "axios";

export const ViewPosts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/community/getUserPosts`,
    { withCredentials: true }
  );
  return res.data;
};
