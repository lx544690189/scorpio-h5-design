import { history } from 'umi';
import { doChildrenDestroy } from './utils';

history.listen((location: any, action: any) => {
  if (location.pathname !== '/design') {
    doChildrenDestroy();
  }
});
