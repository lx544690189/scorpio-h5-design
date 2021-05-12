import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import componentList from '../h5Lib';
import Container from './Container';
import { IPageSchema } from '@/types/schema';

/**
 * 通过url携带的schema标识，获取schema
 */
const getSchemaByUrlParams = async function(): Promise<IPageSchema[]> {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    const data = await window.fetch(`https://design.lxzyl.cn/api/page/getSchema?id=${id}`);
    const res = await data.json();
    return res.data.pageSchema;
  } else {
    throw new Error('参数不正确');
  }
};

/**
 * 通过HTML中注入的变量，获取获取schema
 */
const getSchemaByHtmlConstant = function() {
  return window.__pageSchema;
};

type ITask={
  _id: string;
  name: string;
  component: JSX.Element;
  takeUp: number;
};

/**
 * 异步加载组件
 * - 不要用字符串模板去匹配组件路径，而是通过id做好映射，这样打包工具才知道如何拆分代码
 * @param pageSchema
 */
const fetchComponents = async function(pageSchema: IPageSchema[]) {
  const tasks: Promise<ITask>[] = [];
  pageSchema.forEach((page) => {
    page.components.forEach((component) => {
      const load:Promise<ITask> = new Promise(async(resolve, reject) => {
        // @ts-expect-error
        const asyncComponent = componentList[component._id];
        if (asyncComponent) {
          const timeStemp = new Date().getTime();
          const loadedComponent = (await asyncComponent).default;
          resolve({
            _id: component._id,
            name: component.name,
            component: loadedComponent,
            takeUp: new Date().getTime() - timeStemp,
          });
        } else {
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
const renderComponent = function(pagesSchema: IPageSchema[], loadedComponents: ITask[]) {
  const page = pagesSchema[0];
  return page.components.map((component) => {
    const Cop = loadedComponents.find((item) => item._id === component._id)?.component;
    if(Cop){
      return (
        <Container
          key={component.uuid}
          containerProps={component.containerProps}
          componentProps={component.props}
        >
          <Cop {...component.props} />
        </Container>
      );
    }
    return null;
  });
};

(async function() {
  let pagesSchema;
  const pageConfig = getSchemaByHtmlConstant();
  if (pageConfig) {
    pagesSchema = pageConfig.pageSchema;
  } else {
    pagesSchema = await getSchemaByUrlParams();
  }
  const loadedComponents = await fetchComponents(pagesSchema);
  console.log('-----异步组件加载耗时统计-----');
  console.log(loadedComponents.map((item) => `<${item.name}> ${item.takeUp} ms`).join('\n'));
  console.log('-----异步组件加载耗时统计-----');
  ReactDOM.render(<div className="container">{renderComponent(pagesSchema, loadedComponents)}</div>,
    document.getElementById('root')
  );
  // @ts-expect-error
  window.document.querySelector('.loader-container').style.display = 'none';
  const { title, backgroundColor } = pagesSchema[0].props;
  window.document.title = title;
  window.document.body.style.backgroundColor = backgroundColor;
})();
