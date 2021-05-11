declare global {
  interface Window {
    /** 通过index.html注入的变量 */
    __pageSchema: IPageConfig | undefined;
  }
}

export type IPageConfig = {
  _id: string;
  pageSchema: IPageSchema[];
  createdAt: string;
  updatedAt: string;
};

export type IPageSchema = {
  cover: string;
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

export type IComponentSchema = {
  _id: string;
  name: string;
  cover: string;
  categoryId: string;
  generatorSchema: Record<string, unknown>;
  status: number;
  createdAt: string;
  updatedAt: string;
};