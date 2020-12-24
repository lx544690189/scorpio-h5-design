import { request } from 'umi';

const HOST = 'http://127.0.0.1:7001';

export async function getCategoryList(data: {
  current?: number;
  pageSize?: number;
  categoryName?: string;
}) {
  return request(`${HOST}/category/list`, {
    method: 'post',
    data,
  });
}

export async function getComponentDetail(data: {
  componentId: string
}) {
  return request(`${HOST}/category/component/detail`, {
    method: 'post',
    data,
  });
}