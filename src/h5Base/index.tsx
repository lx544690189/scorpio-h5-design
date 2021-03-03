import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import componentList from '../h5Lib';
import Container from './Container';

/**
 * 拉取页面schema
 */
const fetchSchema =  async function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const data = await window.fetch(`https://design.lxzyl.cn/api/page/getSchema?id=${id}`);
  const res = await data.json();
  return res.data.pageSchema;
};

/**
 * 异步加载组件
 * - 不要用字符串模板去匹配组件路径，而是通过id做好映射，这样打包工具才知道如何拆分代码
 * @param pageSchema
 */
const fetchComponents = async function(pageSchema:any[]){
  const tasks:any[] = [];
  pageSchema.forEach((page:any)=>{
    page.components.forEach((component:any)=>{
      const load = new Promise(async(resolve, reject)=>{
        // @ts-expect-error
        const asyncComponent = componentList[component._id];
        if(asyncComponent){
          const loadedComponent = (await asyncComponent).default;
          resolve({
            _id: component._id,
            component: loadedComponent,
          });
        }else{
          reject(`组件: ${component._id}加载失败`);
        }
      });
      tasks.push(load);
    });
  });
  try {
    const loadedComponents = Promise.all(tasks);
    return loadedComponents;
  } catch (error) {
    throw error;
  }
};

// 获取页面组件
const renderComponent = function(pagesSchema: any, loadedComponents:any){
  const page = pagesSchema[0];
  return page.components.map((component: any)=>{
    const Cop = loadedComponents.find((item:any)=>item._id === component._id).component;
    return (
      <Container
        key={component.uuid}
        containerProps={component.containerProps}
        componentProps={component.props}
      >
        <Cop {...component.props}/>
      </Container>
    );
  });
};

(async function(){
  const pagesSchema = await fetchSchema();
  const loadedComponents = await fetchComponents(pagesSchema);
  ReactDOM.render(
    <div>
      {
        renderComponent(pagesSchema, loadedComponents)
      }
    </div>,
    document.getElementById('root')
  );
})();
