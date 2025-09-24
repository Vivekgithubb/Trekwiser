import axios from "axios";

// Your API function
export const SignUpApi = async (userData) => {
  // userData = { fullName, email, password, ... }
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/register`,
    userData
  );
  return res.data;
};
