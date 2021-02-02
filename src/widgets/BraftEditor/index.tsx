import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import './index.less';

interface IProps {
  name?: string;
  value: string;
  onChange: (name: string | undefined, value: string) => void
}

const controls= [
  'undo', 'redo', 'separator',
  'font-size', 'line-height', 'letter-spacing', 'separator',
  'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
  'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
  'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
  'link', 'separator', 'hr', 'separator',
  'media', 'separator',
  'clear',
];

export default function(props: IProps) {
  const {value, name, onChange} = props;
  const [editor, setEditor] = useState(()=>BraftEditor.createEditorState(value));

  const submitContent = async() => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editor.toHTML();
  };

  const handleEditorChange = (editor:any) => {
    setEditor(editor);
    const htmlContent = editor.toHTML();
    onChange(name, htmlContent);
  };

  return (
    <div className="braft-editor">
      <BraftEditor
      // @ts-expect-error
        controls={controls}
        value={editor}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </div>
  );
}
