import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const CustomCarousel = () => {
  const handleOnDragStart = (e) => e.preventDefault();
  const aladin = require('../assets/aladin.jpeg');
  const charlie = require('../assets/charlies-angels.jpeg');
  const showman = require('../assets/showman.jpeg');
  const spiderman = require('../assets/spiderman.jpeg');

  return (
    <AliceCarousel
      autoPlayInterval={2000}
      autoPlay
      buttonsDisabled
    >
      <img src={charlie} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={showman} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
      <img src={spiderman} alt="vacio" onDragStart={handleOnDragStart} className="yours-custom-class" />
    </AliceCarousel>

  );
};

export default CustomCarousel;
