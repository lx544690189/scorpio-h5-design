import React from 'react';
import './index.less';

export default function() {
  return (
    <div className="mobile-simulator">
      <div className="mobile-head-bar"></div>
      <div className="mobile-content" id="mobile-content">
        {/* <iframe className={`mobile ${!props.loading && 'show'}`} id="mobile"/> */}
      </div>
    </div>
  );
}
