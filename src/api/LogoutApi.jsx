import axios from "axios";

// Your API function
export const LogoutApi = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/logout`,
    {},
    { withCredentials: true }
  );
  return res.data;
};
