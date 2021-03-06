export const componentBaseConfig = {
  'type': 'object',
  'properties': {
    'color': {
      'title': '字体颜色',
      'type': 'string',
      'format': 'color',
    },
    'backgroundColor': {
      'title': '背景色',
      'type': 'string',
      'format': 'color',
    },
    'backgroundImage': {
      'title': '背景图',
      'type': 'string',
      'format': 'image',
      'ui:options': {},
    },
    'margin': {
      'title': '外边距',
      'type': 'object',
      'properties': {
        'top': {
          'title': '上边距',
          'type': 'number',
        },
        'right': {
          'title': '右边距',
          'type': 'number',
        },
        'bottom': {
          'title': '下边距',
          'type': 'number',
        },
        'left': {
          'title': '左边距',
          'type': 'number',
        },
      },
    },
    'padding': {
      'title': '内边距',
      'type': 'object',
      'properties': {
        'top': {
          'title': '上边距',
          'type': 'number',
        },
        'right': {
          'title': '右边距',
          'type': 'number',
        },
        'bottom': {
          'title': '下边距',
          'type': 'number',
        },
        'left': {
          'title': '左边距',
          'type': 'number',
        },
      },
    },
  },
  'ui:displayType': 'row',
  'ui:showDescIcon': true,
};

export const componentSchema_1 = {
  _id: '5efb06fb93f74734acf3ef2a',
  uuid: '1606978335720',
  name: '优惠券1',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    type: 'object',
    properties: {
      title: {
        title: '标题',
        type: 'string',
        maxLength: 12,
      },
      info: {
        title: '描述',
        type: 'string',
        maxLength: 12,
      },
      status: {
        title: '状态',
        type: 'string',
        enum: [1, 2, 3],
        enumNames: ['未领取', '已领取', '已使用'],
        'ui:width': '100%',
      },
      amount: {
        title: '券金额',
        type: 'number',
      },
    },
  },
  props: {
    info: '有效期：领取5天后',
    title: '老用户体验券',
    status: 3,
    amount: 1,
  },
  containerProps: {

  },
};

export const componentSchema_2 = {
  _id: '5f0bd86393f74734ac1d6bfd',
  uuid: '1606978346558',
  name: '优惠券2',
  cover: 'https://static.ccrgt.com/images/ac954ea1-523d-4448-8e5b-7e30c54ce89c.png',
  schema: {
    type: 'object',
    properties: {
      title: {
        title: '标题',
        type: 'string',
        maxLength: 12,
      },
      info: {
        title: '描述',
        type: 'string',
        maxLength: 12,
      },
      status: {
        title: '状态',
        type: 'string',
        enum: [1, 2, 3],
        enumNames: ['未领取', '已领取', '已使用'],
        'ui:width': '100%',
      },
      amount: {
        title: '券金额',
        type: 'number',
      },
    },
  },
  props: {
    info: '有效期：领取5天后',
    title: '新用户体验券',
    status: 3,
    amount: 1,
  },
  containerProps: {

  },
};

export const pageSchema = [{
  uuid: '1606978346559',
  // 基本配置
  config: {
    // 页面标题
    title: '页面标题',
    // 是否首页
    isHomePage: true,
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

export const page_generatorSchema = {
  'schema': {
    'type': 'object',
    'properties': {
      'isHome': {
        'title': '设为主页面',
        'type': 'boolean',
        'ui:widget': 'switch',
        'default': true,
      },
      'title': {
        'title': '页面名称',
        'type': 'string',
        'ui:options': {},
      },
      'path': {
        'title': '路径',
        'type': 'string',
        'ui:options': {},
      },
      'backgroundColor': {
        'title': '背景色',
        'type': 'string',
        'format': 'color',
      },
    },
    'ui:column': 1,
    'ui:displayType': 'row',
    'ui:showDescIcon': true,
  },
  'displayType': 'row',
  'showDescIcon': true,
  'column': 1,
};
