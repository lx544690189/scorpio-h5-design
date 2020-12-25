import { useState, useCallback } from 'react';
export default function componentEdit() {
  const [pageSchema, setPageSchema] = useState([]);

  return {
    pageSchema,
    setPageSchema,
  };
}
