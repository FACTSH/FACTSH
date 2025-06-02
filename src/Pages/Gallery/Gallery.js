// src/components/Gallery/Gallery.js
import React from 'react';
import Masonry from 'react-masonry-css';
import Heading from '../../components/Heading/Heading';
import ImageCard from '../../components/ImageCard/Imagecard';
import galleryimage from '../../Content/galleryimages';
import './gallery.css';

const Gallery = () => {
  const breakpointColumnsObj = {
    default: 3,  // 3 columns on wide screens
    1100: 2,     // 2 columns ≥ 1100px
    800: 1,      // 1 column ≥ 800px
    500: 1       // 1 column ≥ 500px (basically mobile)
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
