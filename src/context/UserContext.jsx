import LoginServices from '../services/LoginServices.js';
import { useState, useEffect } from 'react'
import { createContext } from 'react';

export const UserContext = createContext();  // nombre del contexto  // UserContext.Provider contiene las variables que se pasan como parametros

export function UserContextProvider(props) {    // componente que contiene el contexto

    const getDataUser = () => {
        let u = JSON.parse(localStorage.getItem('user'));
        // si user == null es porque todavia no se guardo la variable en el local storage
        if (u == null) {
            u = {};
            u.isLogged = false;
            localStorage.setItem('user', JSON.stringify({ isLogged: false }));
        }
        return u;
    }

    const [user, setUser] = useState(() => getDataUser());    // se crea la variable de estado global como user.logged = true || false

    const [showModalExpiredLoggin, setShowModalExpiredLoggin] = useState();

    const checkIsLogged = async () => {
        let u = JSON.parse(localStorage.getItem('user'));
        setUser(u);
        // si el user del localStorage aparece logueado, se comprueba. Si no se setea como no logueado
        if (u != null && u.isLogged == true) {
            const isLogged = await LoginServices.isLogged();

            if (isLogged) {
                console.log('Is logged');
                setUser(u);
            } else {
                console.log('Is not logged');
                setShowModalExpiredLoggin(true);
                setUnloggedUser();
            }
        } else {
            setUnloggedUser();
        }
    }

    // checks every 60 seconds
    useEffect(() => {
        setInterval(() => {
            checkIsLogged();
        }, 60000); // 60seg.
    }, []);

    // checks once
    useEffect(() => {
        checkIsLogged();
    }, []);

    // recive los datos del usuario y los guarda en la valiriable user
    const setLoggedUser = async (data) => {
        const dataUser = {
            isLogged: true,
            username: data.username,
            // imgUrl: data.imageUrl || null,
            // isAdmin: data.isAdmin
        };
        localStorage.setItem('user', JSON.stringify(dataUser));
        setUser(dataUser);
    }

    const setUnloggedUser = async () => {
        const res = await LoginServices.logout();
        localStorage.setItem('user', JSON.stringify({ isLogged: false }));
        setUser({ isLogged: false });
        return res;
    }

    return (
        <UserContext.Provider value={{ user, setLoggedUser, setUnloggedUser, showModalExpiredLoggin, setShowModalExpiredLoggin }}>
            {props.children}
        </UserContext.Provider>
    )
}