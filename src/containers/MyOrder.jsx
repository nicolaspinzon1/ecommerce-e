import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "../styles/MyOrder.scss";
import Cookies from "js-cookie";
import { getSession } from "../Utils/getSession";

import OrderItem from "../components/OrderItem";
import useInitialState from "../hooks/useInitialState";

const currentSession = getSession();

const MyOrder = ({ setToggleOrders }) => {
  const [open, setOpen] = useState(true);
  const { state, removeFromCart } = useInitialState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const sumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price) * currentValue.quantity;
    const sum = state.cart.reduce(reducer, 0);
    return sum.toFixed(2);
  };

  const updateTotalPrice = () => {
    const total = sumTotal();
    setTotalPrice(total);
  };

  const checkAuthStatus = () => {
    const token = Cookies.get("AuthData");
    setIsAuth(!!token);
  };

  useEffect(() => {
    checkAuthStatus();
    updateTotalPrice();
  }, [state.cart]);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (isAuth) {
      const cartData = state.cart;
      console.log("Datos del carrito:", cartData);
      console.log(currentSession);
      if (cartData && cartData.length > 0) {
        fetch("https://x762022t-8000.use2.devtunnels.ms/cart/add_cart/", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${currentSession}`,
          },
          body: JSON.stringify({ cart: cartData }),
        })
          .then((response) => {
            console.log("Respuesta del servidor:", response);
            if (response.ok) {
              localStorage.removeItem("cartState");
              window.location.href = "/Checkout";  // Redirigir a la página de checkout

            } else {
              console.error("No se pudo agregar al carrito");
            }
          })
          .catch((error) => console.error("Error:", error));
      }
    } else {
      window.location.href = "/Login?checkout=1";
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="fixed inset-0 overflow-hidden z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Orden de productos
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-blue-700"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {state.cart.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="ml-4 flex flex-1 flex-col">
                                  <OrderItem
                                    key={`orderItem-${product.id}`}
                                    product={product}
                                    handleRemove={handleRemove}
                                    updateTotalPrice={updateTotalPrice}
                                    checkoutCompleted={false}
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${totalPrice}</p>
                      </div>

                      <div className="mt-6">
                        <button
                          onClick={handleCheckout}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
                        >
                          Verificar
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MyOrder;
