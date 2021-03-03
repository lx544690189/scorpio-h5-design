import { childrenModel } from '@/utils/bridge';
import { Tooltip } from 'antd';
import React, { useState } from 'react';
import { useModel } from 'umi';
import classnames from 'classnames';
import './index.less';

interface IProps {
  size: {
    width: number;
    height: number;
  };
  selectComponent:any;
}

export default function(props: IProps) {
  const [borderVisible, setBorderVisible] = useState(() => window.localStorage.getItem('selectArea_borderVisible') !== 'false');
  const { selectComponentRect, scrollTop, selectComponent, pageSchema, setStateByObjectKeys } = useModel('bridge');
  const { top, height, scrollTopSnapshot } = selectComponentRect as any;
  const diffScrollHeight = scrollTopSnapshot - scrollTop;
  const computedTop = top + diffScrollHeight;
  const computedHeight = computedTop < 0 ? height + computedTop : height;
  const minHeight = 0;
  const maxHeight = props.size.height - 0;
  const style = {
    top: computedTop < minHeight ? minHeight : (computedTop > maxHeight ? maxHeight : computedTop),
    height: computedHeight < minHeight ? minHeight : computedHeight,
    // borderColor: (computedTop < 0 && -computedTop >= height) ? '#eee' : 'orange',
  };

  // 定位元素
  const findPosition = function() {
    window.postmate_mobile.call(childrenModel.SCROLL_TO_POSITION, top + scrollTopSnapshot);
  };
  // 显示隐藏边界
  const borderVisibleChange = function() {
    setBorderVisible(!borderVisible);
    window.localStorage.setItem('selectArea_borderVisible', !borderVisible ? 'true' : 'false');
  };
  // 删除组件
  const deleteComponent = function() {
    if(selectComponent){
      pageSchema[0].components = pageSchema[0].components.filter((item:any)=>item.uuid !== selectComponent.uuid);
      console.log('pageSchema: ', pageSchema);
      setStateByObjectKeys({
        pageSchema: [...pageSchema],
      });
    }
  };

  return (
    <div className={classnames('select-area', 'isSelected', { border: style.height !== 0 && borderVisible })} style={style}>
      <div className="select-area-panel">
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="定位当前元素" color="orange">
            <i className={classnames('iconfont', 'icon-dingwei')} onClick={findPosition} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="显示/隐藏组件边界" color="orange">
            <i className={classnames('iconfont', 'icon-other_zhankai')} onClick={borderVisibleChange} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="删除当前组件" color="orange">
            <i className={classnames('iconfont', 'icon-shanchu')} onClick={deleteComponent} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
