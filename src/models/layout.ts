import { SIDES_MENU } from '@/types/layout';
import { useState, useCallback } from 'react';

export default function layout() {
  const [side, setSide] = useState<{
    menu: SIDES_MENU
  }>({
    menu: SIDES_MENU.page,
  });

  return {
    side,
    setSide,
  };
}

