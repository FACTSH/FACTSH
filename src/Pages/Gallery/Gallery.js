// App.js
import React from 'react';
import galleryimage from '../../Content/galleryimages';
import Masonry from 'react-masonry-css';
import ImageCard from '../../components/ImageCard/Imagecard';
import Heading from '../../components/Heading/Heading';
import './gallery.css'
const Gallery = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    800: 1,
    500: 1
  };

  return (
    <div className="gallery">
      <Heading content="Gallery" />
      <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {galleryimage.map((image, index) => (
        <ImageCard key={index} image={image} />
      ))}
    </Masonry>
    </div>
  );
};

export default Gallery;






