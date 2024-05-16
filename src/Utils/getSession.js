import Cookies from 'js-cookie';

// Función para guardar el token de autenticación en la cookie
export const saveSession = (token) => {
    Cookies.set('AuthData', token, { expires: 7 }); 
}

// Función para obtener el token de autenticación desde la cookie
export const getSession = () => {
    return Cookies.get('AuthData');
}
