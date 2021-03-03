import React from 'react';
import './index.less';
import 'braft-editor/dist/output.css';

export default function(props:any) {
  return (
    <div className="braft-output-content" dangerouslySetInnerHTML={{__html: props.html}}></div>
  );
}
