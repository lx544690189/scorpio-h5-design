import React from 'react';

export default function(props: {
  children: React.ReactChild;
}){
  return (
    <div className="layout-full">{props.children}</div>
  );
}