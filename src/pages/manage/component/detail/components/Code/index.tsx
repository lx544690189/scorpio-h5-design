import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useModel } from 'umi';

import './index.less';

export default function Code() {
  const { selectComponent } = useModel('bridge');

  const options = {
    selectOnLineNumbers: true,
  };
  function editorDidMount(editor:any, monaco:any) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  function onChange(newValue:string, e:any) {
    console.log('onChange', newValue, e);
  }
  const code = JSON.stringify(selectComponent.schema, null, 4);
  console.log('code: ', code);
  return (
    <div className="code-editor">
      <MonacoEditor
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
