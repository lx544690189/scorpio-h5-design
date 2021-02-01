import React, { useEffect, useRef } from 'react';
import E from 'wangeditor';

import './index.less';

interface IProps {
  name?: string;
  value: string;
  onChange: (name: string | undefined, value: string) => void
}

export default function Editor(props: IProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { value, onChange, name } = props;

  useEffect(()=>{
    const editor = new E(editorRef.current);
    editor.config.height = 500;
    editor.config.onchange = (newHtml: string)=> {
      console.log('change 之后最新的 html', newHtml);

    };
    editor.create();
    setTimeout(() => {
      onChange(name, 'newHtml');
    }, 3000);
  }, []);

  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
}
