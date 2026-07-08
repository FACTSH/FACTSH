import React from 'react';
import './imagecard.css'
const ImageCard = ({ image }) => {
  return (
    <div className="image-card">
      <img src={require(`../../assets/gallery/${image.src}`)} alt={image.alt} loading="lazy" />
    </div>
  );
};

export default ImageCard;
