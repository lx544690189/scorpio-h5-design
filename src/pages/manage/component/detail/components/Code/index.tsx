import React, { useState } from 'react';
// import MonacoEditor from 'react-monaco-editor';
import parseJson from 'json-parse-better-errors';
import { useModel } from 'umi';
import Loadable from 'react-loadable';

import './index.less';
import { message } from 'antd';
import Loading from '@/components/Loading';

const LoadableComponent = Loadable({
  loader: ()=>import('react-monaco-editor'),
  loading: Loading,
});

export default function Code() {
  const { selectComponent } = useModel('bridge');

  const options = {
    selectOnLineNumbers: true,
    strike: true,
  };
  function editorDidMount(editor:any, monaco:any) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  function onChange(newValue:string, e:any) {
    try {
      const jsonValue = parseJson(newValue);
      console.log('jsonValue: ', jsonValue);
    } catch (error) {
      message.error('json格式错误');
      console.log('error: ', error);
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
