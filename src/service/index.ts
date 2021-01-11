import { request } from 'umi';

const HOST = 'http://127.0.0.1:7001';

export async function getCategoryList(data: {
  current?: number;
  pageSize?: number;
}, form: {
  categoryName?: string;
}) {
  return request(`${HOST}/category/list`, {
    method: 'post',
    data: {
      ...data,
      ...form,
    },
  });
}

export async function addCategory(data: {
  categoryName: string;
}) {
  return request(`${HOST}/category/add`, {
    method: 'post',
    data,
  });
}

export async function editCategory(data: {
  categoryId: string;
  categoryName: string;
}) {
  return request(`${HOST}/category/edit`, {
    method: 'post',
    data,
  });
}

export async function deleteCategory(data: {
  categoryId: string;
}) {
  return request(`${HOST}/category/delete`, {
    method: 'post',
    data,
  });
}

export async function addComponent(data: {
  categoryId: string;
  component: {
    name: string;
    cover?: string;
  }
}) {
  return request(`${HOST}/category/component/add`, {
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