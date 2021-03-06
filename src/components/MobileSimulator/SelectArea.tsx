import { message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import classnames from 'classnames';
import './index.less';

interface IProps {
  loading: boolean;
  size: {
    width: number;
    height: number;
  };
}

export default function(props: IProps) {
  const [scrollTop, setScrollTop] = useState<any>(0);
  const { selectComponentId, pageSchema, setStateByObjectKeys, showSelectComponentBorder } = useModel('bridge');
  const maxHight = props.size.height - 90;
  const style = {
    top: scrollTop < 0 ? 0 : (scrollTop > maxHight ? maxHight : scrollTop),
  };
  useEffect(()=>{
    if(props.loading === false && window.frames['mobile']){
      // @ts-expect-error
      const childWindow = window.frames['mobile'];
      const h5Canvas = childWindow.document.querySelector('.h5-canvas');
      const onscroll = function(e:any){
        // setScrollTop(e.target.scrollTop);
        const selectElement = childWindow.document.querySelector('.h5-canvas-block.isSelected');
        if(selectElement){
          const rect = selectElement.getBoundingClientRect().toJSON();
          setScrollTop(rect.top);
        }
      };
      h5Canvas.addEventListener('scroll', onscroll);
      return function(){
        h5Canvas.removeEventListener('scroll', onscroll);
      };
    }
  }, [props.loading]);
  useEffect(()=>{
    if(!selectComponentId){
      return setScrollTop(0);
    }
    // @ts-expect-error
    const childWindow = window.frames['mobile'];
    const selectElement = childWindow.document.querySelector('.h5-canvas-block.isSelected');
    if(selectElement){
      const rect = selectElement.getBoundingClientRect().toJSON();
      setTimeout(() => {
        setScrollTop(rect.top);
      });
    }
  }, [selectComponentId]);

  // 定位元素
  const findPosition = function() {
    if(!selectComponentId){
      return message.info('请选选取一个组件');
    }
    // @ts-expect-error
    const childWindow = window.frames['mobile'];
    childWindow.document.querySelector('.h5-canvas-block.isSelected').scrollIntoView();
  };
  // 显示隐藏边界
  const borderVisibleChange = function() {
    if(!selectComponentId){
      return message.info('请选选取一个组件');
    }
    window.localStorage.setItem('selectArea_borderVisible', !showSelectComponentBorder ? 'true' : 'false');
    setStateByObjectKeys({
      showSelectComponentBorder: !showSelectComponentBorder,
    });
  };
  // 删除组件
  const deleteComponent = function() {
    if(!selectComponentId){
      return message.info('请选选取一个组件');
    }
    pageSchema[0].components = pageSchema[0].components.filter((item:any)=>item.uuid !== selectComponentId);
    console.log('pageSchema: ', pageSchema);
    setStateByObjectKeys({
      pageSchema: [...pageSchema],
      selectComponentId: undefined,
    });
  };

  return (
    <div className={classnames('select-area')} style={style}>
      <div className="select-area-panel">
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="定位当前元素">
            <i className={classnames('iconfont', 'icon-dingwei')} onClick={findPosition} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="显示/隐藏组件边界">
            <i className={classnames('iconfont', 'icon-other_zhankai')} onClick={borderVisibleChange} />
          </Tooltip>
        </div>
        <div className="select-area-panel-operation">
          <Tooltip placement="right" title="删除当前组件">
            <i className={classnames('iconfont', 'icon-shanchu')} onClick={deleteComponent} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
