import React from 'react';

export default function(props: any) {
  console.log('props: ', props);
  const { height, html } = props;
  const style: any = {};
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
