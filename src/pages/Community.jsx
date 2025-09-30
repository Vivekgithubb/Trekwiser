import TrekDetailCard from "@/components/TrekDetailCard";
import { usePosts } from "@/hooks/fetchPostHook";

export default function Community() {
  const { posts, isLoading } = usePosts();
  console.log(posts);
  return (
    <div>
      {posts.length === 0 ? (
        <div className="w-full h-screen flex flex-row justify-center items-center">
          <div className="spinner mt-2 mb-4">
            <svg
              className="animate-spin h-15 w-15 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </div>
        </div>
      ) : (
        <div className="mt-15 mb-3">
          <div className="w-full text-center">
            <h1 className="font-title text-xl font-light">Community</h1>
            <h3 className="text-[12px]">
              Share your best experiences and help people explore.
            </h3>
          </div>
          {posts.map((post) => (
            <TrekDetailCard
              key={post._id}
              id={post._id}
              image={post.images?.map((image) => image.url) || []}
              location={post.location}
              avatar={post.user?.avatar?.url}
              title={post.title}
              author={post.user?.username || "unknown"}
              difficulty={post.difficulty}
              description={post.description}
              likes={post.likes.length}
              isliked={post.likedByUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}
