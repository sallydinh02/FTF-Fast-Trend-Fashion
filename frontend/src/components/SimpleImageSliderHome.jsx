import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: require("../assets/images/slider/banner1.jpg") },
    { url: require("../assets/images/slider/banner2.jpg") },
  ];
const SimpleImageSliderHome = () => {
  return (
    <div style={{objectFit: 'cover'}}>
        <SimpleImageSlider
        width={1520}
        height={363.564}
        images={images}
        slideDuration={0.6}
        autoPlay={true}
        autoPlayDelay={5}
        showBullets={true}
        showNavs={true}
      />
    </div>
  )
}

export default SimpleImageSliderHome