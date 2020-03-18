import React from "react";
import "./Home.css";
export const Home = () => (
  <video className="home__full_screen_video" poster="media/foo.jpg" loop>
    <source src={process.env.REACT_APP_CLOUDINARY_MP4_VIDEO} type="video/mp4" />
  </video>
);
