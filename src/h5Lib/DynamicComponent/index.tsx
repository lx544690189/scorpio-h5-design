/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import _600fd4f8607ea614fc3c894c from '../600fd4f8607ea614fc3c894c';
console.log('_600fd4f8607ea614fc3c894c: ', _600fd4f8607ea614fc3c894c);

interface Iprops {
  id: string;
  uuid: string;
  isSelected: boolean;
  componentProps: any;
  containerProps: any;
}

export default function(props: Iprops) {
  const { id, uuid, isSelected, componentProps, containerProps } = props;
  const Component = require(`../${id}`).default;
  const {
    color, fontSize, fontWeight,
    backgroundImage, backgroundColor, backgroundSize, backgroundRepeat,
    borderColor, borderWidth, borderStyle, borderRadius,
    boxShadow,
    margin, padding,
  } = containerProps ?? {};
  const style = {
    color,
    fontSize,
    fontWeight,
    backgroundColor,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize,
    backgroundRepeat,
    borderColor,
    borderWidth,
    borderStyle,
    borderRadius,
    boxShadow,
  };

  return (
    <div data-uuid={uuid} data-selected={isSelected} style={style}>
      <Component {...componentProps}/>
    </div>
  );
}
