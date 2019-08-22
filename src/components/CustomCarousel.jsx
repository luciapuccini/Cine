import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CustomCarousel = () => {
  const handleOnDragStart = (e) => e.preventDefault();
  const photo = require('../assets/img.jpeg');
  return (
    <AliceCarousel mouseDragEnabled buttonsDisabled>
      <img src={photo} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={photo} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={photo} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={photo} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
    </AliceCarousel>
  );
};

export default CustomCarousel;
