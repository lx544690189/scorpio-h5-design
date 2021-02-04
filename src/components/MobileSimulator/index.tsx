import React from 'react';
import './index.less';

export default function(props:any) {
  const {domReact} = props;
  console.log('domCeact: ', domReact);
  let style= {};
  if(domReact){
    const {top, height} = domReact;
    style = {
      top,
      height,
    };
  }
  return (
    <div className="mobile-simulator-container">
      <div className="select-area isSelected" style={style}>

      </div>
      <div className="mobile-simulator">
        <div className="mobile-head-bar"></div>
        <div className="mobile-content" id="mobile-content" />
      </div>
    </div>
  );
}
