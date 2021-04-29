/* eslint-disable @typescript-eslint/ban-types */

import Postmate from 'Postmate';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
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
    isChildren_ready: boolean;
    children_ready_task: any[];
    onCaptureComponentOver: (fileName:string)=>void;
    postmate_mobile:Postmate.ParentAPI;
    postmate_parent:Postmate.ChildAPI;
  }
}