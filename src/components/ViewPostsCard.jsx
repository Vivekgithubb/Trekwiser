import React, { useState } from "react";

export default function ViewPostsCard({ post }) {
  const [loaded, setLoaded] = useState(false);
  const imageUrl = post.images[0].url;
  // Low-res blurred preview
  const lowRes = `${imageUrl}?w=10&blur=1000`;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md">
      {/* Blurred tiny placeholder */}
      <img
        src={lowRes}
        alt="Post"
        className={`absolute inset-0 h-full w-full object-cover scale-105 blur-xl transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Full-resolution image */}
      <img
        src={imageUrl}
        alt="Post"
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
