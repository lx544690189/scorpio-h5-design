/* eslint-disable @typescript-eslint/ban-types */

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
interface Window {
  isChild: boolean;
  isChildren_ready: boolean;
  children_ready_task: any[];
  onCaptureComponentOver: (fileName:string)=>void
}

declare module 'form-render/lib/antd' {
  import React from 'react';
  export interface FRProps {
    schema: object;
    formData: object;
    onChange(data?: object): void;
    onMount?(): void;
    name?: string;
    column?: number;
    uiSchema?: object;
    widgets?: any;
    FieldUI?: any;
    fields?: any;
    mapping?: object;
    showDescIcon?: boolean;
    showValidate?: boolean;
    displayType?: string;
    onValidate?: any;
    readOnly?: boolean;
    labelWidth?: number | string;
    useLogger?: boolean;
  }
  class FormRender extends React.Component<FRProps> { }
  export default FormRender;
}

declare module 'fr-generator' {
  interface Props {
    defaultValue?: any;
    templates?: any;
    extraButtons?: Boolean[];
  }
  export default class Generator extends React.Component<Props> { }
}