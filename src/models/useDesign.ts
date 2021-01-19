import * as service from '@/service';
import { useRequest } from 'umi';

export default function useAuthModel() {
  const queryAllWithComponentReq = useRequest(service.queryAllWithComponent, {
    initialData: [],
    manual: true,
  });

  return {
    queryAllWithComponentReq,
  };
}
