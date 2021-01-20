/* eslint-disable @typescript-eslint/no-var-requires */
import { pxToVw } from '@/utils';
import React from 'react';

interface Iprops {
  id: string;
  componentProps: any;
  containerProps: any;
}

function computedBorder({top, right, bottom, left}:any){
  return `${pxToVw(top)}vw ${pxToVw(right)}vw ${pxToVw(bottom)}vw ${pxToVw(left)}vw`;
}

export default function(props: Iprops) {
  const { id, componentProps, containerProps } = props;
  const Component = require(`@/h5Lib/${id}/index.tsx`).default;
  const {color, backgroundColor, margin, padding} = containerProps ?? {};
  const style = {
    color,
    backgroundColor,
    margin: margin ? computedBorder(margin): 0,
    padding: padding ? computedBorder(padding): 0,
  };

  return (
    <div style={style}>
      <Component {...componentProps}/>
    </div>
  );
}
