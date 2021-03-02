import React from 'react';
import { Button } from 'antd-mobile';

export default function(props:any) {
  const {text, ...rest} = props;
  return <Button {...rest}>{text}</Button>;
}
