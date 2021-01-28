// @ts-nocheck
import React from 'react';
import ColorPicker from 'rc-color-picker';
import { Input } from 'antd';
import 'rc-color-picker/assets/index.css';
import { useDebounceFn } from 'ahooks';
import classnames from 'classnames';
import './index.less';


function transformColorWithAlpha(colorString: string, alpha: number) {
  if (alpha === 100) {
    return colorString;
  }
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let color = colorString.toLowerCase();
  if (reg.test(color)) {
    if (color.length === 4) {
      let colorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    const colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    return `rgba(${colorChange.join(',')},${alpha / 100})`;
  } else {
    return color;
  }
}

export default function color(p) {
  const onInputChange = (e) => {
    p.onChange(e.target.value);
  };
  const { run: onPickerChange  } = useDebounceFn((e) => {
    console.log('e: ', e);
    if (p.disabled || p.readonly) return;
    p.onChange(transformColorWithAlpha(e.color, e.alpha));
  }, {
    wait: 300,
  },);

  const onPickerClose = function(e){
    console.log('e: ', e);
    if (p.disabled || p.readonly) return;
    p.onChange(transformColorWithAlpha(e.color, e.alpha));
  };

  const onInputBlur = function(e){
    console.log(e.target.value);
  };

  // const matchAlpha = p.value.match(/\((.*?)\)/);

  return (
    <div className={classnames('fr-color-picker', p.className)}>
      {
        <ColorPicker
          animation="slide-up"
          color={p.value || '#fff'}
          onClose={onPickerClose}
        />
      }
      {p.readonly ? (
        <span>{p.value}</span>
      ) : (
        <Input
          placeholder="颜色值"
          disabled={p.disabled}
          value={p.value}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />
      )}
    </div>
  );
}
