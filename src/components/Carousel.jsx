import React from "react";
import Slider from "react-slick";
import "../component-css/carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ data, onSelect, selectedOption, onCheckboxChange }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    className: "slider-container",
  };

  const handleCheckboxChange = (option) => {
    onCheckboxChange(option);
  };

  return (
    <Slider {...settings}>
      {data.map((option, index) => (
        <div key={index} className="internalCont">
          <img src={option.image} alt={option.name} className="carouselImg" />
          <div className="textCont">
            <p>{option.name}</p>
            <p>{","}</p>
            <p style={{ marginLeft: "0.5vw" }}>{option.distance + "Kms"}</p>
          </div>
          <div className="selection">
            <input
              type="checkbox"
              onClick={() => onSelect(option)}
              checked={selectedOption === option}
              onChange={() => handleCheckboxChange(option)}
              className="checkbox"
            />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
