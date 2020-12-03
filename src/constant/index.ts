import { ISchema } from '@formily/antd';

interface IComponent {
  _id:string;
  uuid:string;
  name:string;
  cover:string;
  schema:ISchema,
}

export const componentSchema_1: IComponent = {
  _id: '5efb06fb93f74734acf3ef2a',
  uuid: '1606978335720',
  name: '优惠券1',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    'x-component-props': {
      'size': 'medium',
      'labelAlign': 'left',
      'labelCol': 7,
      'wrapperCol': 12,
      'step': 1,
      'precision': 0,
    },
    'x-rules': [],
    'x-linkages': [],
    'type': 'object',
    'properties': {
      'info': {
        'x-component': 'input',
        'type': 'string',
        'x-index': 1,
        'x-component-props': {
          'allowClear': true,
        },
        'title': '券描述',
        'x-rules': [
          {
            'required': true,
          },
        ],
      },
      'title': {
        'x-component': 'input',
        'type': 'string',
        'x-index': 0,
        'x-component-props': {
          'placeholder': '注意长度控制',
          'allowClear': true,
        },
        'title': '标题',
        'x-rules': [
          {
            'required': true,
          },
        ],
      },
      'status': {
        'x-component': 'select',
        'type': 'string',
        'title': '状态',
        'x-index': 2,
        'x-component-props': {
          'placeholder': '',
          'dataSource': [
            {
              'label': '未领取',
              'value': '1',
            },
            {
              'label': '领取成功',
              'value': '2',
            },
            {
              'label': '领取失败',
              'value': '3',
            },
          ],
          'allowClear': true,
        },
        'x-rules': [
          {
            'required': true,
          },
        ],
      },
      'amount': {
        'x-component': 'numberpicker',
        'type': 'number',
        'title': '金额',
        'x-index': 3,
        'x-component-props': {
          'step': 1,
          'precision': 0,
          'innerAfter': '元',
        },
        'x-rules': [
          {
            'required': true,
            'maximum': 10,
            'minimum': 1,
          },
        ],
      },
    },
  },
};

export const componentSchema_2: IComponent = {
  _id: '5f0bd86393f74734ac1d6bfd',
  uuid: '1606978346558',
  name: '优惠券2',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    'x-component-props': {
      'size': 'medium',
      'labelAlign': 'left',
      'wrapperCol': 12,
      'labelCol': 7,
    },
    'type': 'object',
    'properties': {
      'xx': {
        'type': 'string',
        'x-component': 'input',
        'x-component-props': {
          'allowClear': true,
        },
        'title': '测试',
        'x-index': 0,
      },
    },
  },
};

export const pageSchema = [{
  // 基本配置
  config: {
    // 页面标题
    title: '页面标题',
    // 封面
    cover: 'https://static.ccrgt.com/images/82ab171c-a600-434f-aafb-3724006e1c92.png',
    // 路径
    path: 'home',
    // 分享
    share: {
      type: [1, 2],
      desc: '邀请好友助力',
    },
  },
  components: [componentSchema_1, componentSchema_2],
}];