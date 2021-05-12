import React from 'react';
import { Accordion } from 'antd-mobile';
import RichText from '../../base/RichText';

interface IProps {
  accordion: boolean | undefined;
  defaultActiveKey: string | string[] | undefined;
  list: {
    header: string;
    content: string;
  }[]
}

export default function(props: IProps) {
  const { accordion, defaultActiveKey, list = [] } = props;
  return (
    <div>
      <Accordion accordion={accordion} defaultActiveKey={defaultActiveKey}>
        {
          list.map((item, index) => (
            <Accordion.Panel header={item.header} key={index}>
              <RichText html={item.content} />
            </Accordion.Panel>
          ))
        }
      </Accordion>
    </div>
  );
}
