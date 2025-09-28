import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/me`,
        {
          withCredentials: true,
        }
      );
      return data.data.user;
    },
    retry: false,
    // staleTime: 1000 * 60 * 5, // 5 minutes
    // cacheTime: 1000 * 60 * 10,
  });
};
