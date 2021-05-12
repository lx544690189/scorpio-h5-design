/** 页面配置 */
export type IPageConfig = {
  _id: string;
  pageSchema: IPageSchema[];
  createdAt: string;
  updatedAt: string;
};
/** 页面schema */
export type IPageSchema = {
  cover?: string;
  coverSnapshot?: string;
  props: {
    path: string;
    title: string;
    backgroundColor: string;
    isHome: boolean;
  };
  generatorSchema: Record<string, unknown>;
  components: IComponentSchema[];
  status: number;
};
/** 组件schema */
export type IComponentSchema = {
  _id?: string;
  uuid?: string;
  name: string;
  cover: string;
  categoryId: string;
  generatorSchema: Record<string, unknown>;
  containerProps: IContainerProps;
  props: Record<string, unknown>;
  status: number;
  createdAt: string;
  updatedAt: string;
};
/** 组件容器props */
export interface IContainerProps {
  color?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: number;
  boxShadow?: string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}