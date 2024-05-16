import { useState } from 'react';

export const useCart = () => {
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => {
    setOpenCart((prev) => !prev);
  };

  return { openCart, toggleCart };
};
