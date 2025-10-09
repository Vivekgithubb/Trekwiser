import { ViewPosts } from "@/api/ViewPosts";
import { useQuery } from "@tanstack/react-query";

export function useViewPosts() {
  const { data, isLoading } = useQuery({
    queryKey: ["view"],
    queryFn: ViewPosts,
    onError: (err) => console.log(err),
  });
  return { posts: data, isLoading };
}
