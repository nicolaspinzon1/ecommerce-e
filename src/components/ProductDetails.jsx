import React, { useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AppContext from "../context/AppContext";

import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const ProductDetails = ({ product, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { addToCart } = useContext(AppContext); // Obtener la función addToCart del contexto

  function closeModal() {
    setIsOpen(false);
    onClose();
  }

  const handleAddToCart = () => {
    addToCart(product); // Agregar el producto al carrito utilizando la función del contexto
    closeModal(); // Cerrar el modal después de agregar al carrito
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-3 overflow-y-auto   ">
          <div className="flex min-h-full items-center justify-center p-6 text-center ">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300 "
              enterFrom="opacity-0 scale-85"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95 "
            >
              <Dialog.Panel className="max-w-[50%] relative h-[65%] mx-auto mt-21 transform overflow-hidden rounded-lg bg-white p-2 text-left align-middle shadow-x1 transition-all ">
                {/* <div className="product-details">
                  <div className="details-header">
                    <h2>{product.Product_name}</h2>
                  </div>
                  <div className="details-content">
                    <img src={product.images} alt={product.Product_name} />
                    <p>Precio: ${product.price}</p>
                    <p>Descripción: {product.description}</p>
                    
                  </div>
                </div> */}
                <div className="absolute top-0 right-0 mr-2 mt-2">
                  <button>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5" // Corregido
                        stroke="currentColor"
                        className="w-7 h-7 hover:text-blue-700"
                        onClick={closeModal}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    {/* Product details border */}
                    <div className="  lg:max-w-lg lg:self-end">
                      <div className="">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                          {product.Product_name}
                        </h1>
                      </div>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h2 id="information-heading" className="sr-only">
                          Product information
                        </h2>

                        <div className="flex items-center">
                          <p className="text-lg text-gray-900 sm:text-xl">
                            Precio: $ {product.price}
                          </p>
                        </div>

                        <div className="mt-4 space-y-6">
                          <p className="text-base text-gray-500">
                            Descripción: {product.description}
                          </p>
                        </div>
                        <div className="mt-4 space-y-6">
                          <p className="text-base text-gray-500">
                            Cantidad disponible: {product.stock}
                          </p>
                        </div>
                        <div className="mt-1 mb-8 space-y-6">
                          <p className="text-base text-gray-500">
                            Marca:{product.brand}
                          </p>
                        </div>
                      </section>
                    </div>

                    {/* Product image */}
                    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                        <img
                          src={product.images}
                          
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-mt-24 mb-14 px-8 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                  <section aria-labelledby="options-heading">
                    <h2 id="options-heading" className="sr-only">
                      Product options
                    </h2>

                    <div className="mt-10">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center max-w-80 rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        onClick={handleAddToCart}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductDetails;
