import { fetchposts } from "@/api/FetchPosts";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchposts,
    onError: (error) => {
      toast.error(error.response?.data?.message || "failed to fetch posts");
    },
  });

  return { posts: data?.data || [], isLoading };
}
