import TrekDetailCard from "@/components/TrekDetailCard";
import { usePosts } from "@/hooks/fetchPostHook";

export default function Community() {
  const { posts, isLoading } = usePosts();
  return (
    <div>
      <div className="mt-15 mb-3">
        <div className="w-full text-center">
          <h1 className="font-title text-xl font-light">Community</h1>
          <h3 className="text-[12px]">
            Share your best experiences and help people explore.
          </h3>
        </div>

        {/* <SearchBar /> */}
        {posts.map((post) => (
          <TrekDetailCard
            key={post._id}
            image={post.images?.map((image) => image.url) || []}
            location={post.location}
            avatar={post.user?.avatar?.url}
            title={post.title}
            author={post.user?.username || "unknown"}
            difficulty={post.difficulty}
            description={post.description}
          />
        ))}
      </div>
    </div>
  );
}
