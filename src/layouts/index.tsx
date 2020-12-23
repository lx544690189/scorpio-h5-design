/* eslint-disable indent */
import React from 'react';
import { ConfigProvider } from 'antd';
import { withRouter } from 'umi';
import zhCN from 'antd/lib/locale/zh_CN';
import './index.less';
import Full from './component/Full';
import Manage from './component/Manage';

export default withRouter((props: any) => {
  const { pathname } = props.location;
  console.log('pathname: ', pathname);
  let Layout = Full;
  if(pathname.indexOf('/manage') !== -1  && pathname !== '/manage/component/detail'){
    Layout = Manage;
  }

  return (
    <ConfigProvider locale={zhCN} >
      <Layout>{props.children}</Layout>
    </ConfigProvider>
  );
});


// export default function(props: any){
//   return (
//     <ConfigProvider locale={zhCN} >
//       <LayoutRoute
//     </ConfigProvider>
//   );
// }