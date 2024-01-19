// const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
// const URI = 'https://localhost:3000'; // en desarrollo
// const URI = 'https://api-album-react-with-session-backend.onrender.com';
import URI from "./URI.js";

const LoginServices = {};

LoginServices.isLogged = async () => {
    try {
        const response = await fetch(URI + '/api/auth/isLogged', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });
        const data = await response.json();
        if (data.status == "OK") {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log('Error in LoginServices.isLogged');
        return false;
    }
}

LoginServices.logout = async () => {
    try {
        const response = await fetch(URI + '/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        });

        const data = await response.json();
        if (data.status == "OK") {
            console.log("logout successfull ", data);
            return true;
        }else{
            return false;
        }
    } catch (err) {
        console.log('error in LoginServices.Logout');
    }
}

//LoginServices.login = async (username, password) => {
// try {
//     const response = await fetch(URI+'/api/auth/login/', {
//         method: 'POST',
//         // credentials: 'omit',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: username, password: password })
//     });
//     const data = await response.json();
//     return data;
// } catch (err) {
//     return {status: "ERROR", message: err.message};
// }
//}

export default LoginServices;