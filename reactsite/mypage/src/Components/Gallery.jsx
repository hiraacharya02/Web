import React from "react";
import "../styles/App.css";

const Gallery = () => {
  const images = ["cat1.jpg", "cat2.jpg", "cat3.jpg", "cat4.jpg", "cat5.jpg"];
  return (
    <div className="image-gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Cat ${index + 1}`} />
      ))}
    </div>
  );
};

export default Gallery;