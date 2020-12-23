import axios from 'axios';
import { request } from 'umi';

// const request = axios.create({
//   baseURL: 'http://127.0.0.1:7001',
// });

export async function getCategoryList(data: any) {
  return request('http://127.0.0.1:7001/component/category/list', {
    method: 'post',
    data,
  });
}