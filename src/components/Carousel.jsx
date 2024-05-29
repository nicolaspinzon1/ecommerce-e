import React from "react";

export const Carousel = ({ blog }) => {
  return (
    <div className="h-full w-[250px] m-3 flex-shrink-0 cursor-pointer flex justify-center items-center">
      <div className="rounded-2xl overflow-hidden mb-4 relative h-[90px] w-[550px]">
        <img src={`/src/assets/icons/blogpost${blog.id}.png`} alt={`Blogpost ${blog.id}`} className="object-cover w-full h-full" />
      </div>
    </div>
  );
};
