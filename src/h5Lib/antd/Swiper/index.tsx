import React from 'react';
import { Carousel } from 'antd-mobile';

interface IProps {
  imgList: {
    href: string;
    imgUrl: string;
  }[];
  autoplay: boolean | undefined;
  dots: boolean | undefined;
  vertical: boolean | undefined;
  infinite: boolean | undefined;
  swipeSpeed: number | undefined;
  height: number;
}

export default function(props: IProps) {
  const { imgList = [], autoplay, dots, vertical, infinite, swipeSpeed, height } = props;
  return (
    <Carousel
      autoplay={autoplay}
      dots={dots}
      vertical={vertical}
      infinite={infinite}
      swipeSpeed={swipeSpeed}
    >
      {imgList.map((item, index) => (
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
