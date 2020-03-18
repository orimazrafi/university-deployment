import React from "react";
import "./Home.css";
import ReactPlayer from "react-player";

export const Home = () => (
  <ReactPlayer
    url={process.env.REACT_APP_CLOUDINARY_MP4_VIDEO}
    style={{ height: "100px", width: "200px" }}
    loop
  />
);
