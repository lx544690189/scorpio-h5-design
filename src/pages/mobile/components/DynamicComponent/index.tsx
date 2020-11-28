/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';

interface Iprops {
  id: string;
}

export default function(props: Iprops) {
  const { id } = props;
  const Component = require(`@/h5Lib/${id}/index.tsx`).default;

  return <Component />;
}
