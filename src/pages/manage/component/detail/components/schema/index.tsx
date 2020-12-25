import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Generator from 'fr-generator';
import './index.less';
import Model from '../../model';

const defaultValue = {
  schema: {
    type: 'object',
    properties: {
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

export default forwardRef((props: any, ref: any) => {
  const { componentDetailData } = Model.useContainer();
  // const GeneratorRef = useRef(null);

  // useImperativeHandle(ref, () => ({
  //   // @ts-expect-error
  //   getValue: GeneratorRef.current.getValue,
  //   // @ts-expect-error
  //   setValue: GeneratorRef.current.setValue,
  //   // @ts-expect-error
  //   copyValue: GeneratorRef.current.copyValue,
  // }));


  return (
    <div className="manage-component-detail-schema">
      <Generator
        ref={ref}
        defaultValue={componentDetailData.generatorSchema || defaultValue}
        templates={[]}
        extraButtons={[false, false, false, false]}
      />
    </div>
  );
});