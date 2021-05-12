import React from 'react';
import { Button } from 'antd-mobile';
import { ButtonProps } from 'antd';

interface IProps extends ButtonProps {
  text: string;
}

export default function(props: IProps) {
  const { text, ...rest } = props;
  // @ts-expect-error
  return <Button {...rest}>{text}</Button>;
}
