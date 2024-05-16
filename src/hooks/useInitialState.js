import { useState, useEffect } from "react";

const initialState = {
  cart: [],
};

const useInitialState = () => {
  const [state, setState] = useState(() => {
    const storedState = localStorage.getItem("cartState");
    return storedState ? JSON.parse(storedState) : initialState;
  });

  const addToCart = (payload, quantity = 1) => {
    const existingItemIndex = state.cart.findIndex(item => item.id === payload.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...state.cart];
      updatedCart[existingItemIndex].quantity = quantity;
      setState({
        ...state,
        cart: updatedCart,
      });
    } else {
      setState({
        ...state,
        cart: [...state.cart, { ...payload, quantity }],
      });
    }
  };

  const removeFromCart = (payload) => {
    setState((prevState) => ({
      ...prevState,
      cart: prevState.cart.filter((item) => item.id !== payload),
    }));
  };

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  return {
    state,
    addToCart,
    removeFromCart,
  };
};

export default useInitialState;
