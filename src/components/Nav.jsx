import { Fragment, useEffect, useState } from "react";
import React, { useContext } from "react";
import AppContext from "../context/AppContext.js";
// import{ useOpenCart} from "../hooks/useOpenCart";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { getSession } from "/src/Utils/getSession.js";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/Logo2.png";
import bandera from "../assets/images/bandera2.jpeg";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import MyOrder from "../containers/MyOrder.jsx";

import "../styles/Shop.css";
import axios from "axios";

const navigation = {
  categories: [
    {
      id: "products",
      name: "Productos",
      featured: [{}, {}],
      sections: [],
    },
  ],
  pages: [{ name: "¿Quiénes somos?", href: "#" }],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const currentSession = getSession();

export default function Nav({ user }) {
  const [isAuth, setIsAuth] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [open, setOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const handleCartClick = () => {
  //   setOpenCart(true);
  // };
  const [toggle, setToggle] = useState(false);
  const [toggleOrders, setToggleOrders] = useState(false);
  const [toggleMobile, setToggleMobile] = useState(false);
  const {
    state: { cart },
  } = useContext(AppContext);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const token = Cookies.get("AuthData");
    setIsAuth(!!token); // Convierte el token en un booleano
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://render-ecommerce-ki8y.onrender.com/accounts/logout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Elimina la cookie de autenticación
        Cookies.remove("AuthData");

        // Actualiza el estado de autenticación
        setIsAuth(false);
      } else {
        console.error("Error al cerrar sesión:", response.statusText);
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  // useEffect(() => {
  //   const token = Cookies.get("AuthData");
  //   if (token) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  //   console.log(Cookies.get("AuthData"));
  //   console.log(isAuth);
  // }, [isAuth]);

  // const handleCartClick = () => {
  //   setOpenCart((prev) => !prev); // Cambia el estado del carrito de abierto a cerrado o viceversa
  // };

  return (
    <div className=" relative top-0 z-50 bg-white ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Cerrar menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                    
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className=""
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/Products"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Productos
                    </Link>
                  </div>

                  <Link
                    to="/AboutUs"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sobre nosotros
                  </Link>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {!isAuth ? (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Iniciar sesión
                      </Link>{" "}
                      <Link
                        to="/signup"
                        className=" -m-2 block p-2 font-medium text-gray-900"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        onClick={handleLogout}
                      >
                        <span>Cerrar sesión</span>
                      </Link>
                    </>
                  )}
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <img
                    src={bandera}
                    height={51}
                    width={51}
                    alt=""
                    className="block h-auto w-7 flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    COL
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Menu abierto</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Motobikershop</span>
                  <img src={logo} alt="logo" height={51} width={51} />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <div className="flex lg:ml-6">
                    <Link
                      to="/Products"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Productos
                    </Link>
                  </div>

                  <Link
                    to="/AboutUs"
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sobre nosotros
                  </Link>
                </div>
              </div>

              {/* web */}

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!isAuth ? (
                    <>
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Iniciar sesión
                      </Link>{" "}
                      <Link
                        to="/signup"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        onClick={handleLogout}
                      >
                        <span>Cerrar sesión</span>
                      </Link>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src={bandera}
                      height={61}
                      width={61}
                      alt=""
                      className="block h-auto w-7 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">COL</span>
                    {/* <span className="sr-only"> cambiar moneda</span> */}
                  </a>
                </div>

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a
                    href="/search"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Buscador</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div> */}
                <div
                  onClick={() => setToggleOrders(!toggleOrders)}
                  className="relative cursor-pointer lg:ml-6"
                >
                  <div className="relative">
                    <ShoppingBagIcon
                      className="h-6 w-6 relative"
                      aria-hidden="true"
                    />
                    {cart.length > 0 && (
                      <div className="absolute -top-1.5 text-white bg-blue-600 h-[18px] w-[18px] text-sm object-center  rounded-full items-center justify-center text-center font-medium -right-1.5">
                        <span className="flex -mt-[1px]  items-center justify-center ">
                          {" "}
                          {cart.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    {toggleOrders && (
                      <MyOrder
                        toggleOrders={toggleOrders}
                        setToggleOrders={setToggleOrders}
                      />
                    )}
                  </div>
                </div>

                {/* Cart */}
                {/* <div className="ml-auto flex items-center">
                  <div>
                    <li
                      className="navbar-shopping-cart"
                      onClick={() => setToggleOrders(!toggleOrders)}
                    >
                      <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                      {cart.length > 0 ? <div>{cart.length}</div> : null}
                    </li>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </header>
    </div>
  );
}
