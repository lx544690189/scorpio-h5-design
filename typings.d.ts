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

// declare module 'form-render/lib/antd' {
//   import React from 'react';
//   export interface FRProps {
//     schema: object;
//     formData: object;
//     onChange(data?: object): void;
//     onMount?(): void;
//     name?: string;
//     column?: number;
//     uiSchema?: object;
//     widgets?: any;
//     FieldUI?: any;
//     fields?: any;
//     mapping?: object;
//     showDescIcon?: boolean;
//     showValidate?: boolean;
//     displayType?: string;
//     onValidate?: any;
//     readOnly?: boolean;
//     labelWidth?: number | string;
//     useLogger?: boolean;
//   }
//   class FormRender extends React.Component<FRProps> { }
//   export default FormRender;
// }

// declare module 'fr-generator' {
//   interface Props {
//     defaultValue?: any;
//     templates?: any;
//     extraButtons?: Boolean[];
//     widgets?: any;
//     settings?: any[];
//   }
//   export default class Generator extends React.Component<Props> { }
// }