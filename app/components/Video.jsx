import React from "react";
const Video = () => {
  return (
    <div className=" bg-gray-600 md:w-full rounded-md">
      <video
        controls
        className="w-full h-[40vh] sm:scale-105 rounded-md"
        title="remove cursor to see it full"
      >
        <source src="/displayP-gen.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
