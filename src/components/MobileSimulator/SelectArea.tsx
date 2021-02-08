import { childrenModel } from '@/utils/bridge';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import classnames from 'classnames';
import './index.less';

export default function() {
  const [borderVisible, setBorderVisible] = useState(()=>window.localStorage.getItem('selectArea_borderVisible') !== 'false');
  const { selectComponentRect, scrollTop } = useModel('bridge');
  const { top, height, scrollTopSnapshot } = selectComponentRect as any;
  let style = {};
  const diffScrollHeight = scrollTopSnapshot - scrollTop;
  const computedTop = top + diffScrollHeight;
  const computedHeight = computedTop < 0 ? height + computedTop : height;
  style = {
    top: computedTop < 0 ? 0 : computedTop,
    height: computedHeight < 0 ? 0: computedHeight,
    // borderColor: (computedTop < 0 && -computedTop >= height) ? '#eee' : 'orange',
  };

  // 定位元素
  const findPosition = function() {
    window.postmate_mobile.call(childrenModel.SCROLL_TO_POSITION, top + scrollTopSnapshot);
  };
  // 显示隐藏边界
  const borderVisibleChange = function() {
    setBorderVisible(!borderVisible);
    window.localStorage.setItem('selectArea_borderVisible', !borderVisible ? 'true':'false');
  };
  // 删除组件
  const deleteComponent = function() {
    //
  };

  return (
    <div className={classnames('select-area', 'isSelected', {border: borderVisible})} style={style}>
      <div className="select-area-panel">
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="定位当前元素" color="orange">
            <i className="iconfont icon-dingwei" onClick={findPosition} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="显示/隐藏组件边界" color="orange">
            <i className="iconfont icon-other_zhankai" onClick={borderVisibleChange} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="删除当前组件" color="orange">
            <i className="iconfont icon-shanchu" onClick={deleteComponent} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
