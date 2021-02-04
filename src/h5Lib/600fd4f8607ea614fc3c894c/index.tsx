import React from 'react';
import style from './index.less';

export default function(props:any) {
  return (
    <div className={style.imgContainer}>
      {props.image ? <img className="img" src={props.image}/> : <div className={style.empty}>请上传图片</div>}
    </div>
  );
}
