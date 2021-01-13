import { request } from 'umi';

const HOST = 'http://127.0.0.1:7001';

export async function getCategoryList(data: {
  current?: number;
  pageSize?: number;
}, form: {
  name?: string;
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
  name: string;
}) {
  return request(`${HOST}/category/add`, {
    method: 'post',
    data,
  });
}

export async function editCategory(data: {
  _id: string;
  name: string;
}) {
  return request(`${HOST}/category/edit`, {
    method: 'post',
    data,
  });
}

export async function deleteCategory(data: {
  _id: string;
}) {
  return request(`${HOST}/category/delete`, {
    method: 'post',
    data,
  });
}

export async function queryAllWithComponent() {
  return request(`${HOST}/category/queryAllWithComponent`, {
    method: 'post',
  });
}

export async function addComponent(data: {
  categoryId:string;
  name: string;
  cover?: string;
}) {
  return request(`${HOST}/component/add`, {
    method: 'post',
    data,
  });
}

export async function queryComponentDetail(data: {
  _id: string
}) {
  return request(`${HOST}/component/detail`, {
    method: 'post',
    data,
  });
}

export async function editComponent(data: {
  _id: string;
  name: string;
  cover: string;
  generatorSchema?: string;
  props?: string;
  containerProps?: string;
}) {
  return request(`${HOST}/component/edit`, {
    method: 'post',
    data,
  });
}

export async function deleteComponent(data: {
  _id: string;
}) {
  return request(`${HOST}/component/delete`, {
    method: 'post',
    data,
  });
}