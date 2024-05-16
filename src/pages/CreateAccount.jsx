import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";

export default function CreateAccount() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'first_name') {
      setFirstName(value);
    } else if (name === 'last_name') {
      setLastName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch("https://x762022t-8000.use2.devtunnels.ms/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });

      if (!response.ok) {
		
        throw new Error('Error al registrar la cuenta');
      }
	  
      setSuccessMessage('¡Cuenta creada con éxito!');
      setError('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPassword2('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col bg-gray-50 justify-center px-6 py-12 lg:px-8 border border-gray-400 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-13 w-20"
            src="https://res.cloudinary.com/dlxf1d5ag/image/upload/v1711156717/llo/crear-removebg-preview_g6aiqb.png"
            alt="Your Company"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crear cuenta
          </h2>
        </div>

        <div className="mt-2 border bg-white shadow-lg py-8 px-12 rounded-lg sm:mx-auto sm:w-full sm:max-w-lg">
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre 
              </label>
              <div className="mt-1">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="Nombre"

                  
                  value={first_name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                Apellido 
              </label>
              <div className="mt-1">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Apellido"

                  value={last_name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Correo electrónico"

                  value={email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"

                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password2" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmar contraseña
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password2"
                  name="password2"
                  type="password"
                  placeholder="Confirmar contraseña"

                  value={password2}
                  onChange={handlePassword2Change}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div>
              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              <button
                type="submit"
                className="flex mt-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrar
              </button>
			  
            </div>
          </form>
        </div>
      </div>
	  <Outlet />
    </>
  );
}
