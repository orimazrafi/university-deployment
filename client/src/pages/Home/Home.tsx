import React from "react";
import "./Home.css";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";

export const Home = () => (
  <div>
    <ReactPlayer
      url={process.env.REACT_APP_CLOUDINARY_MP4_VIDEO}
      playing
      loop
    />
  </div>
);
