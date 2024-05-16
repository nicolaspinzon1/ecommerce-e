import React, { useState, useContext, useEffect } from "react";
import close from "../assets/icons/icon_close.png";
import AppContext from "../context/AppContext";

const OrderItem = ({
  product,
  handleRemove,
  updateTotalPrice,
  checkoutCompleted,
}) => {
  const [counter, setCounter] = useState(product.quantity);
  const { addToCart, removeFromCart, state } = useContext(AppContext);

  useEffect(() => {
    // Actualiza el contador cuando el producto cambie
    setCounter(product.quantity);
  }, [product.quantity]);

  const handleIncrement = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    updateLocalStorage(newCounter);
  };

  const handleDecrement = () => {
    const newCounter = counter > 0 ? counter - 1 : 0;
    setCounter(newCounter);
    updateLocalStorage(newCounter);
  };

  const updateLocalStorage = (newCounter) => {
    const currentState = state.cart;
    const item = currentState.find((item) => item.id === product.id);

    if (item) {
      item.quantity = newCounter;
      removeFromCart(product.id);
      addToCart(product, newCounter);
      if (updateTotalPrice) {
        updateTotalPrice();
      }
    }
  };

  const handleRemoveClick = () => {
    if (!checkoutCompleted) {
      removeFromCart(product.id);
      handleRemove(product.id);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.images}
            alt={product.Product_name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-900">{product.Product_name}</h3>
          <p className="text-sm font-medium text-gray-500">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            className="text-indigo-600 hover:text-indigo-500"
            onClick={handleDecrement}
          >
            -
          </button>
          <p className="text-gray-500">{counter}</p>
          <button
            className="text-indigo-600 hover:text-indigo-500"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        <button
          className="text-indigo-600 hover:text-indigo-500"
          onClick={handleRemoveClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
