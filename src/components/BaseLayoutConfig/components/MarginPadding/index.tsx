import React from 'react';
import { useModel } from 'umi';
import './index.less';

export default function() {
  const { selectComponent, pageSchema, setStateByObjectKeys} = useModel('bridge');
  const {containerProps} = selectComponent;
  const handleChange = function(value: string, key1: 'margin' | 'padding', key2: 'top' | 'right' | 'bottom' | 'left') {
    if(!selectComponent.containerProps){
      selectComponent.containerProps = {
        margin: {},
        padding: {},
      };
    }
    if(!selectComponent.containerProps.margin){
      selectComponent.containerProps.margin = {};
    }
    if(!selectComponent.containerProps.padding){
      selectComponent.containerProps.padding = {};
    }
    selectComponent.containerProps[key1][key2] = value;
    setStateByObjectKeys({
      pageSchema: [...pageSchema],
    });
  };

  return (
    <div className="layout-config">
      <div className="margin-top">
        <input value={containerProps?.margin?.top} onChange={(e) => { handleChange(e.target.value, 'margin', 'top'); }} />
      </div>
      <div className="margin-right">
        <input value={containerProps?.margin?.right} onChange={(e) => { handleChange(e.target.value, 'margin', 'right'); }} />
      </div>
      <div className="margin-bottom">
        <input value={containerProps?.margin?.bottom} onChange={(e) => { handleChange(e.target.value, 'margin', 'bottom'); }} />
      </div>
      <div className="margin-left">
        <input value={containerProps?.margin?.left} onChange={(e) => { handleChange(e.target.value, 'margin', 'left'); }} />
      </div>
      <div className="padding-top">
        <input value={containerProps?.padding?.top} onChange={(e) => { handleChange(e.target.value, 'padding', 'top'); }} />
      </div>
      <div className="padding-right">
        <input value={containerProps?.padding?.right} onChange={(e) => { handleChange(e.target.value, 'padding', 'right'); }} />
      </div>
      <div className="padding-bottom">
        <input value={containerProps?.padding?.bottom} onChange={(e) => { handleChange(e.target.value, 'padding', 'bottom'); }} />
      </div>
      <div className="padding-left">
        <input value={containerProps?.padding?.left} onChange={(e) => { handleChange(e.target.value, 'padding', 'left'); }} />
      </div>
    </div>
  );
}
