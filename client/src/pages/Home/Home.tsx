import React from "react";
import "./Home.css";
import ReactPlayer from "react-player";

export const Home = () => (
  <div className="home__container">
    <ReactPlayer
      width="100%"
      height="unset"
      url={process.env.REACT_APP_CLOUDINARY_MP4_VIDEO}
      playing
      loop
    />
  </div>
);
