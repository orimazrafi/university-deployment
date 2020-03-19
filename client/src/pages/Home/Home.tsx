import React from "react";
import "./Home.css";
import ReactPlayer from "react-player";

export const Home = () => (
  <div
    style={{
      position: "absolute",
      top: "60px",
      left: "0",
      right: "0",
      bottom: "100px"
    }}
  >
    <ReactPlayer
      width="100%"
      url={process.env.REACT_APP_CLOUDINARY_MP4_VIDEO}
      playing
      loop
    />
  </div>
);
