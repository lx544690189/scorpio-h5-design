import React from 'react';
import { Carousel } from 'antd-mobile';

export default function(props: any) {
  const { imgList = [], autoplay, dots, vertical, infinite, swipeSpeed, height } = props;
  return (
    <Carousel
      autoplay={autoplay}
      dots={dots}
      vertical={vertical}
      infinite={infinite}
      swipeSpeed={swipeSpeed}
    >
      {imgList.map((item:any, index:number) => (
        <a
          key={index}
          href={item.href}
          style={{ display: 'inline-block', width: '100%', height }}
        >
          <img
            src={item.imgUrl}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
          />
        </a>
      ))}
    </Carousel>
  );
}
