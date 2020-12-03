import { TEMPLATE_TYPE } from '@/types';
import { useState, useCallback } from 'react';
export default function useAuthModel() {

  /** 创建模板 */
  const onCreateTemplate = function(type: TEMPLATE_TYPE) {
    /** 空白模板 */
    if(type === TEMPLATE_TYPE.blank){

    }
    /** 示例模板 */
    if(type === TEMPLATE_TYPE.example){

    }
  };

  return {
    onCreateTemplate,
  };
}
