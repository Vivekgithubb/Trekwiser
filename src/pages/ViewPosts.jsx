import Modal from "@/components/Modal";
import TrekDetailCard from "@/components/TrekDetailCard";
import ViewPostsCard from "@/components/ViewPostsCard";
import { useViewPosts } from "@/hooks/ViewPostsHook";
import React from "react";

export default function ViewPosts() {
  const { posts } = useViewPosts();
  console.log(posts);
  return (
    <div className="mt-16 h-screen w-full">
      <div className="w-full text-center">
        <h1 className="font-title text-xl font-light">Your Posts</h1>
        <h3 className="text-[12px] mb-4">
          Your best experiences and Cherised Memories.
        </h3>
      </div>
      <section
        style={{
          position: "relative",
          height: 700,
          minWidth: 320,
          //   width: 320,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            overflowY: "auto",
            padding: "",
          }}
        >
          <div
            className="
                grid 
                gap-1 
                grid-cols-2
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-6
                auto-rows-[100px] 
              "
          >
            {posts?.map((post, index) => (
              <Modal key={index}>
                {/* Thumbnail */}
                <Modal.Open open={`post-${post._id}`}>
                  <div
                    key={index}
                    className={`
                    relative overflow-hidden rounded-lg bg-white 
                    ${index % 3 === 0 ? "row-span-2 col-span-2" : ""}
                    ${index % 5 === 0 ? "col-span-2" : ""}
                  `}
                  >
                    <ViewPostsCard post={post} />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors"></div>
                  </div>
                </Modal.Open>
                {/* Modal Window */}
                <Modal.Window name={`post-${post._id}`}>
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
                </Modal.Window>
              </Modal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
