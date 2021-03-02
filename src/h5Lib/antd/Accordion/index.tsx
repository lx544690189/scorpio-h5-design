import React from 'react';
import { Accordion } from 'antd-mobile';
import _601912a902574daf68578e48 from '../../601912a902574daf68578e48';

export default function(props: any) {
  const { accordion, defaultActiveKey, list = [] } = props;
  return (
    <div>
      <Accordion accordion={accordion} defaultActiveKey={defaultActiveKey}>
        {
          list.map((item:any, index: number)=>(
            <Accordion.Panel header={item.header} key={index}>
              <_601912a902574daf68578e48 html={item.content}/>
            </Accordion.Panel>
          ))
        }
      </Accordion>
    </div>
  );
}
