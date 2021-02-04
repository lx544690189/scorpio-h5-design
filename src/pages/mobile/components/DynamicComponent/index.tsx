/* eslint-disable @typescript-eslint/no-var-requires */
import { pxToVw } from '@/utils';
import React from 'react';

interface Iprops {
  id: string;
  isSelected: boolean;
  componentProps: any;
  containerProps: any;
}

function computedBorder({top, right, bottom, left}:any){
  return `${pxToVw(top)}vw ${pxToVw(right)}vw ${pxToVw(bottom)}vw ${pxToVw(left)}vw`;
}

export default function(props: Iprops) {
  const { id, isSelected, componentProps, containerProps } = props;
  const Component = require(`@/h5Lib/${id}/index.tsx`).default;
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
    margin: margin ? computedBorder(margin): 0,
    padding: padding ? computedBorder(padding): 0,
  };

  return (
    <div name="component-container" data-id={id} data-selected={isSelected} style={style}>
      <Component {...componentProps}/>
    </div>
  );
}
