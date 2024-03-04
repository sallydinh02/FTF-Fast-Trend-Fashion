import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: require("../assets/images/slider/1.png") },
    { url: require("../assets/images/slider/2.png") },
  ];
// const { ref, width = 3.908, height = 1 } = useResizeObserver();
const SimpleImageSliderHome = () => {
  return (
    <div style={{objectFit: 'cover'}}>
        <SimpleImageSlider
        width={1520}
        height={388.941}
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