

import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface DynamicImageProps {

  src: any;

}


export const DynamicImage = ({ src, }: DynamicImageProps) => {

  return (
    <Zoom overlayBgColorEnd='rgba(0, 0, 0, 0.75)'>
      <img
        alt="that wanaka tree"
        src={src}
        width="500"
        className='max-h-[285px]'
      />
    </Zoom>
  );
};



