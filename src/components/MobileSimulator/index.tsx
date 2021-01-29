import React from 'react';
import './index.less';

export default function(props:{
  loading:boolean;
}) {
  return (
    <div className="mobile-simulator">
      <div className="mobile-head-bar"></div>
      <div className="mobile-content">
        <iframe className={`mobile ${!props.loading && 'show'}`} id="mobile"/>
      </div>
    </div>
  );
}
