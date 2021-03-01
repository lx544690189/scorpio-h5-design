
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const pxToVw = function(px:number){
  return px ? px / 750* 100 : 0;
};

function computedBorder({top, right, bottom, left}:any){
  return `${pxToVw(top)}vw ${pxToVw(right)}vw ${pxToVw(bottom)}vw ${pxToVw(left)}vw`;
}

interface IProps{
  children: React.ReactNode;
  componentProps: any;
  containerProps: any;
}

export default function Container(props:IProps){
  const { componentProps, containerProps } = props;
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
    <div className={styles.divContainer} style={style}>
      {props.children}
    </div>
  );
}