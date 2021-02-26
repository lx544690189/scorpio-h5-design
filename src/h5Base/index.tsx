import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import componentList from '../h5Lib';

const fetchSchema =  async function() {
  const data = await window.fetch('http://localhost:7001/api/page/getSchema?id=603369e21ed1f229deec54b4');
  const res = await data.json();
  return res.data.pageSchema;
};

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

const renderComponent = function(pagesSchema: any, loadedComponents:any){
  const page = pagesSchema[0];
  return page.components.map((component: any)=>{
    const Cop = loadedComponents.find((item:any)=>item._id === component._id).component;
    return <Cop key={component.uuid} {...component.props}/>;
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
