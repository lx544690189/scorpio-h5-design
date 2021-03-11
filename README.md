# H5可视化搭建

演示地址：https://scorpio-design.lxzyl.cn

界面预览
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0397b90878c443efbb86f2b8451ae1e6~tplv-k3u1fbpfcp-watermark.image)

操作演示
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be2b7f1236ad4885b772d9fd55e1c503~tplv-k3u1fbpfcp-watermark.image)


## 快速开始

项目分为两块：H5设计、H5基座。

H5设计：
  - dev、build使用umi
  - 负责组件开发、管理、拖拽、页面生成的项目
  - `.umirc.ts`中pxToViewPort配置了`h5lib`目录px转vw（750px设计稿）
  - 设计页面时的H5画布(iframe)并不是由下面"H5基座"实现的，它们大部分的功能相同，但是一个仅开发设计阶段使用，另一个要用于生产环境。存在功能和职能差异，故分开。
dev
```base
npm run dev:design
```
build
```base
npm run build:design
```

H5基座：
  - dev、build使用parceljs
  - 负责最终生成的页面渲染
  - 动态加载组件
  - TODO:可以将页面的json schema直接打入`index.html`，或放到cdn，缩短首屏渲染时间
dev
```base
npm run dev:mobile
```
build
```base
npm run build:mobile
```

## 展望
项目虽然使用react编写，暂只支持react组件，理论上schema -> 组件，并不存在语言、框架限制，理论上vue、小程序都可以支持，只是需要把画布上“schema -> 组件”的中间层替换掉就可以了，
