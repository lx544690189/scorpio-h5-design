import Postmate from 'postmate';

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare global {
  interface Window {
    isChild: boolean;
    postmate_child: Postmate.ParentAPI;
    postmate_parent: Postmate.ChildAPI;
  }
}