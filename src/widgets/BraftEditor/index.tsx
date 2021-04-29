import { useBoolean } from 'ahooks';
import React, { useEffect, useRef } from 'react';
import E from 'wangeditor';

interface IProps {
  value: string;
  onChange: (value: string) => void
}

let editor: E | null = null;
function App(props: IProps) {
  // TODO:组件初始值问题，暂时通过判断是否来自用户的首次输入
  const [isInitial, setIsInitial] = useBoolean(true);
  const { value, onChange } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    editor = new E(ref.current);
    editor.config.onchange = (content:string)=>{
      setIsInitial.setFalse();
      onChange(content);
    };
    editor.create();

    return () => {
      editor && editor.destroy();
    };
  }, []);

  useEffect(()=>{
    if(isInitial && value && editor){
      editor.txt.html(value);
    }
  }, [value, isInitial]);

  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
}

export default App;