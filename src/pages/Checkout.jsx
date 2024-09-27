import { useState, useEffect } from "react";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { getSession } from "../Utils/getSession";
import { Link, Outlet } from "react-router-dom";

const currentSession = getSession();

const Checkout = ({ setToggle }) => {
  const [products, setProducts] = useState([]);
  const { state } = useContext(AppContext);
  const currentSession = getSession();

  const [INIT, setINIT] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://render-ecommerce-ki8y.onrender.com/cart/checkout/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${currentSession}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data.cart.cart_item);
          console.log("Data from checkout API:", data.cart);
        } else {
          console.error("Error fetching data from checkout API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePayment = async () => {
    try {
      console.log("Intentando realizar el pago...");
	 
      const response = await fetch(
        "https://render-ecommerce-ki8y.onrender.com/payments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${currentSession}`,
          },
          body: JSON.stringify({}) 
        }
		
      );
      

      console.log("Response status:", response.status);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.ok) {
        window.location.href = responseData.INIT_POINT;
        console.log("Pago exitoso:", responseData);
       
      } else {
        console.error("Pago fallido:", responseData.statusText);
        
      }
    } catch (error) {
      console.error("Error en el pago", error);
      
    }
  }; 


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el envío automático del formulario
    handlePayment(); // Llamar a la función de pago
  };
  


  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <form   onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
             {/* <h2 className="text-xl font-medium text-gray-900">
              Formulario de envió
            </h2>  */}

            <div className="mt-5 border-0 border-gray-200 pt-10 ">
              {/* mt-4 rounded-lg border border-gray-200 bg-white shadow-sm */}

              <div className="  rounded-lg border-2 border-gray-200 bg-white shadow-sm    ">
                <div className="py-4 px-4  grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                   <div>
                    <label
                      htmlFor="first-name"
                      className="block text-base font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        placeholder="Nombre"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-2 py-1.5 px-2  text-gray-900 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 

                   <div>
                    <label
                      htmlFor="last-name"
                      className="block text-base font-medium text-gray-700"
                    >
                      Apellidos
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        placeholder="Apellidos"
                        autoComplete="family-name"
                        className="block w-full border-2 rounded-md py-1.5 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 

                   <div>
                    <label
                      htmlFor="city"
                      className="block text-base font-medium text-gray-700"
                    >
                      Correo electrónico
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Correo electrónico"
                        autoComplete="address-level2"
                        className="block w-full border-2 rounded-md  py-1.5 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 

                   <div>
                    <label
                      htmlFor="phone"
                      className="block text-base font-medium text-gray-700"
                    >
                      Teléfono
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Teléfono"
                        autoComplete="tel"
                        className="block w-full  border-2 rounded-md  py-1.5 px-2
					  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 
                   <div>
                    <label
                      htmlFor="address"
                      className="block text-base font-medium text-gray-700"
                    >
                      Dirección
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Dirección"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-2 py-1.5 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 

                   <div>
                    <label
                      htmlFor="address details"
                      className="block text-base font-medium text-gray-700"
                    >
                      Detalles dirección
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address details"
                        id="address details"
                        placeholder="Detalles dirección"
                        autoComplete="street-address"
                        className="block w-full border-2 rounded-md py-1.5 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 
                </div>
                <div className="justify-between  flex gap-x-4 mx-4 py-3 ">
                   <div>
                    <label
                      htmlFor="city"
                      className="block text-base font-medium text-gray-700"
                    >
                      Ciudad
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Ciudad"
                        autoComplete="address-level2"
                        className="block w-full border-2 rounded-md  py-1.5 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div> 

                   <div>
                    <label
                      htmlFor="department"
                      className="block text-base font-medium text-gray-700"
                    >
                      Departamento
                    </label>
                    {/* <div className="mt-1">
                      <input
                        type="text"
                        name="department"
                        id="department"
                        placeholder="Departamento"
                        className="block w-full  border-2 rounded-md  py-1.5 px-2
					  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div> */}
                  {/* </div> 
                   <div>
                    <label
                      htmlFor="country"
                      className="block text-base font-medium text-gray-700"
                    >
                      País
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder=" País"
                        autoComplete="country"
                        className="block w-full  border-2 rounded-md  py-1.5 px-2
					  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>  */}
                {/* </div> */}
              </div>
            </div>

            {/* Payment */}
            {/* <div className="mt-5 border-t border-gray-200 pt-7">
              <h2 className="text-xl font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-2">
                <div className="mt-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm  py-8 px-4  grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4  border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="payment-type"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-base font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm  py-8 px-4  grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-base font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full border-2  py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-base font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full border-2  py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-base font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full border-2  py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-base font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full  border-2  py-1.5 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-xl font-medium text-gray-900">
              Resumen del pedido
            </h2>

            <div className="mt-14 rounded-lg border-2 border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only"></h3>
              <ul role="list" className="divide-y divide-gray-200">
                {/* Mapping over products */}
                {products.map((product) => (
                  <li key={product.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product.images}
                        alt={product.imageAlt}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <a
                              href={product.href}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.Product_name}
                            </a>
                          </h4>
                        </div>
                      </div>
                      {/* <div className=" mt-1 text-sm font-medium text-gray-900">  {product.stock}</div> */}

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product.price*1000}
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    $
                    {products.reduce(
                      (acc, product) =>
                        acc + 1000*(product.price) * product.quantity,
                      0
                    )}
                  </dd>
                </div>
              </dl>
			  
            </div>
            <div className="mt-6">
			
			<button
        onClick={handlePayment}
        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full"
      >
        Realizar pago
      </button>
            </div>
          </div>
		  <Outlet />
        </form>
      </div>
    </div>
  );
};
export default Checkout;
