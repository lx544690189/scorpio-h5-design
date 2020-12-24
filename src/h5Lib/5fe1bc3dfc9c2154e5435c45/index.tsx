import React from 'react';
import './index.less';

interface IProps{
  text:string;
}

export default function(props:IProps) {

  return (
    <div className="5fe1bc3dfc9c2154e5435c45">
      {props.text || '默认文本'}
    </div>
  );
}
