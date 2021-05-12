import React from 'react';
import style from './index.less';

interface IProps {
  image: string;
}

export default function(props:IProps) {
  return (
    <div className={style.imgContainer}>
      {props.image ? <img className="img" src={props.image}/> : <div className={style.empty}>请上传图片</div>}
    </div>
  );
}
