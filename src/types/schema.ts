/** 组件容器props */
export interface ISchema_containerProps {
  color: string;
  backgroundColor: string;
  backgroundImage: string;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
/** 组件 */
export interface ISchema_component {
  /** id系统生成，对应组件在本地的文件夹名称（为什么不使用语义化名称：组件会越来越多，甚至同名，将组件分类用数据库管理，乃是良策） */
  _id: string;
  /** 组件唯一标识（一个页面可能由有多个相同组件，在拖拽时会生成uuid标识） */
  uuid: string;
  /** 组件名称 */
  name: string;
  /** 组件预览图 */
  cover: string;
  /** 描述props的表单schema */
  generatorSchema: Record<string, unknown>;
  /** props值，直接传给组件的 */
  props: Record<string, unknown>;
  /** 组件外层容器props（所有组件都会自动包裹此组件，故能使用从容器组件继承过来的css属性，尽量不要重复声明） */
  containerProps: ISchema_containerProps | undefined;
}
/** 页面 */
export interface ISchema_page {
  _id: string;
  /** 页面基本配置 */
  config: {
    title: string;
    index: string;
    isHomePage: boolean;
    cover: string;
    path: string;
  },
  /** 组件（数组顺序及组件排列顺序） */
  components: ISchema_component[];
}