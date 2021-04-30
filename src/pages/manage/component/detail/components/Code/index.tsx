import React, { useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';
import parseJson from 'json-parse-better-errors';
import { useModel } from 'umi';
import Loadable from 'react-loadable';

import './index.less';
import { message } from 'antd';
import Loading from '@/components/Loading';
import { useThrottleFn } from 'ahooks';

const LoadableComponent = Loadable({
  loader: ()=>import('react-monaco-editor'),
  loading: Loading,
});

export default function Code() {
  const { selectComponent, pageSchema, setStateByObjectKeys } = useModel('bridge');
  const jsonError = useThrottleFn(()=>{
    message.error('json格式错误');
  }, {
    wait: 3000,
  });

  const options = {
    selectOnLineNumbers: true,
    strike: true,
  };
  function editorDidMount(editor:any, monaco:any) {
    editor.focus();
  }
  function onChange(newValue:string, e:any) {
    try {
      const jsonValue = parseJson(newValue);
      pageSchema[0].components[0].generatorSchema = jsonValue;
      setStateByObjectKeys({
        pageSchema: [...pageSchema],
      });
    } catch (error) {
      // message.error('json格式错误');
      console.log('error: ', error);
      jsonError.run();
    }
  }
  const code = JSON.stringify(selectComponent.generatorSchema, null, 2);
  console.log('code: ', code);
  return (
    <div className="code-editor">
      <LoadableComponent
        language="json"
        theme="vs-light"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </div>
  );
}
