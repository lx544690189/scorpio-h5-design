/* eslint-disable @typescript-eslint/no-var-requires */
import { pxToVw } from '@/utils';
import React from 'react';
import h5Lib from '@/h5Lib';
import Loadable from 'react-loadable';

interface Iprops {
  id: string;
  uuid: string;
  isSelected: boolean;
  componentProps: any;
  containerProps: any;
}

function computedBorder({top, right, bottom, left}:any){
  return `${pxToVw(top)}vw ${pxToVw(right)}vw ${pxToVw(bottom)}vw ${pxToVw(left)}vw`;
}

function Loading(props:any) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

export default function(props: Iprops) {
  const { id, uuid, isSelected, componentProps, containerProps } = props;
  // const Component = require(`@/h5Lib/${id}/index.tsx`).default;
  // @ts-expect-error
  const Component = h5Lib[id];
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
  const LoadableComponent = Loadable({
    loader: ()=>Component,
    loading: Loading,
  });

  return (
    <div data-uuid={uuid} data-selected={isSelected} style={style}>
      <LoadableComponent {...componentProps}/>
    </div>
  );
}
