import { useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';

export default createContainer(() => {
  const getCategoryList = useRequest(service.getCategoryList, {
    initialData: {
      list: [],
      total: 0,
    },
  });

  return {
    getCategoryList,
  };
});