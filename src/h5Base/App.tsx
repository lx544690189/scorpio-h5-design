
import React, { useEffect, useState } from 'react';
import {getComponentById} from '../h5Lib';
const html = '<h2 style="text-align:start;" size="2" _root="[object Object]" __ownerid="undefined" __hash="undefined" __altered="false"><span style="letter-spacing:0px">设计资源</span></h2><p><span style="font-size:12px">我们提供完善的设计原则、最佳实践和设计资源文件（<span style="color:#000000"><code>Sketch</code></span> 和<span style="color:#000000"><code>Axure</code></span>），来帮助业务快速设计出高质量的产品原型。</span></p><ul><li><a href="https://ant.design/docs/spec/proximity" direction="ltr" class="ant-typography">设计原则</a></li><li><a href="https://ant.design/docs/pattern/navigation" direction="ltr" class="ant-typography">设计模式</a></li></ul><blockquote><span style="font-size:12px">AntV 是蚂蚁金服全新一代数据可视化解决方案</span></blockquote>';


export default function APP(){
  const Cops = <div>123</div>;
  const [Ms, setMs] = useState();

  useEffect(()=>{
    init();
  }, []);

  const init = async function(){
    const data = await window.fetch('http://localhost:7001/api/page/getSchema?id=603369e21ed1f229deec54b4');
    const res = await data.json();
    console.log('result: ', res.data.pageSchema);

    const Cop = await import('../h5Lib/600fd4f8607ea614fc3c894c');
    console.log('Cop: ', Cop);
    setMs(Cop.default);
  };
  console.log('Cops: ', Cops);

  return (
    <div>
      {
        Cops
      }
      {/* <Ms /> */}
      {/* <_601912a902574daf68578e48 html={html}/> */}
    </div>
  );
}