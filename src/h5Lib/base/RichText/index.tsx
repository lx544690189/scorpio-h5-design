import React from 'react';
import style from './index.less';
import 'braft-editor/dist/output.css';

export default function(props:any) {
  return (
    <div className={style.braftOutputContent} dangerouslySetInnerHTML={{__html: props.html}}></div>
  );
}
