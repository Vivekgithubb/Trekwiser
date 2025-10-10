// import axios from "axios";
import apiClient from "./apiClient";

// Your API function
export const LoginApi = async (userData) => {
  // userData = { fullName, email, password, ... }
  const res = await apiClient.post("/api/users/login", userData, {
    withCredentials: true,
  });
  return res.data;
};
