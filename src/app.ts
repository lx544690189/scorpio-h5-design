import { history } from 'umi';
import { doChildrenDestroy } from './utils/bridge';
import { RequestConfig } from 'umi';

history.listen((location: any, action: any) => {
  if (location.pathname !== '/design') {
    doChildrenDestroy();
  }
});

// export const request: RequestConfig = {
// };