import React, { useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(searchParams.get("checkout") == '1')
      const response = await fetch(
        "https://x762022t-8000.use2.devtunnels.ms/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }) || "",
        }
      );
      const data = await response.json();
      if (response.ok) {
        Cookies.set("AuthData", data.token);
        console.log(data);
        searchParams.get("checkout") == '1' ? navigate("/Checkout") : navigate("/") 
      } else {
        alert("Error en el servidor");
      }
    } catch (error) {
      alert("Error al iniciar sesion");
      // console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col bg-gray-50 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            className="mx-auto h-13 w-20"
            src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711150679/llo/972105c5a775f38cf33d3924aea053f1-removebg-preview_shvxle.png"
            alt="Your Company"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
        </div>

        <div className="mt-2 border bg-white shadow-lg py-8 px-12 rounded-lg sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
                
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"

                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <button
                
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      <Outlet />
    </>
  );
}
