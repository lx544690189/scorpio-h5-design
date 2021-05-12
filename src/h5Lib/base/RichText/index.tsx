import React from 'react';

interface IProps {
  height?: number;
  html: string;
}

export default function(props: IProps) {
  const { height, html } = props;
  const style:any = {};
  if(height && height > 0){
    style.overflowY = 'auto';
    style.height = height;
  }

  return (
    <div
      className="rich-text-content"
      dangerouslySetInnerHTML={{ __html: html }}
      style={style}
    />
  );
}
