import { IPageConfig } from '@/types/schema';

declare global {
  interface Window {
    /** 通过index.html注入的变量 */
    __pageSchema: IPageConfig | undefined;
  }
}