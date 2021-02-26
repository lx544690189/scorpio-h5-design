import React from 'react';
// import QierPlayer from 'qier-player';
import style from './index.less';
import { pxToVw } from '@/utils';
import { Button } from 'antd';

export default function(props:any) {
  const {srcOrigin, width, height, themeColor} = props;
  return (
    <div className={style.videoContainer}>
      <Button />
      {/* <QierPlayer
        key={`${width}-${height}`}
        width={`${pxToVw(width)}vw`}
        height={`${pxToVw(height)}vw`}
        language="zh"
        showVideoQuality={false}
        themeColor={themeColor}
        srcOrigin={srcOrigin}
      /> */}
    </div>
  );
}
