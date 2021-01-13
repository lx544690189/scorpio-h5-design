import { useRequest } from 'umi';
import { createContainer } from 'unstated-next';
import * as service from '@/service';

export default createContainer(() => {
  const queryAllWithComponent = useRequest(service.queryAllWithComponent, {
    initialData: [],
  });

  return {
    queryAllWithComponent,
  };
});