import React, { useContext, useState } from "react";
import "../styles/ProductItem.scss";
import AppContext from "../context/AppContext";

import addToCartImage from "../assets/icons/bt_add_to_cart.svg";
import addToBCartImage from "../assets/icons/bt_added_to_cart.svg";
const ProductItem = ({ product, onClick }) => {
  // Importaciones
  const { state, addToCart, removeFromCart } = useContext(AppContext) || {
    state: { cart: [] },
    addToCart: () => {},
    removeFromCart: () => {},
  };
  const [showDetails, setShowDetails] = useState(false);

  // Función para agregar/eliminar al carrito
  const handleClick = (item) => {
    ProductAdded() ? removeFromCart(item) : addToCart(item);
  };

  // Función para que busque en el contexto si existe el producto en el carrito
  const ProductAdded = () =>
    state.cart.some((item) => item.id === product.id) ? true : false;

    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-15 sm:px-3 sm:py-21  lg:px-2">
          <div className="">
            <div className="group relative">
              <div className="aspect-h-1 border-2 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-78">
                <img
                  src={product.images}
                  alt={product.imageAlt}
                  
                  onClick={() => onClick(product)}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900" >{product.Product_name}</p>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
                <figure onClick={() => handleClick(product)}>
                  {ProductAdded() ? (
                    <img src={addToBCartImage} alt="Added to Cart" />
                  ) : (
                    <img src={addToCartImage} alt="Add to Cart" />
                  )}
                </figure>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
};
export default ProductItem;
