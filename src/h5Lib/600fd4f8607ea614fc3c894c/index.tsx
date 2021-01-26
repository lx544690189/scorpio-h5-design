import React from 'react';
import style from './index.less';

export default function(props:any) {
  return (
    <div className={style.imgContainer}>
      <img className="img" src={props.image}/>
    </div>
  );
}
