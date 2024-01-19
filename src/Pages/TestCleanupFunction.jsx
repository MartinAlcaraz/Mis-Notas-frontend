import { useEffect, useState } from "react";


const CleanupFunction = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let timeout = setTimeout(() => {
            console.log("Dejo de escribir.")
            // se podria hacer la validacion de los input luego del tiempo especificado.
        }, 700);

        return () => {
            // la funcion cleanup es este return
            // Se ejecuta a partir de la segunda vez que las variables 'email' ó 'password' cambian de valor
            console.log("Cleanup function.");
            clearTimeout(timeout);
        }

    }, [email, password]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Submitted form.");
    }

    return (
            <form onSubmit={onSubmitHandler} className='flex flex-col p-8 m-1 min-h-[58vh] border-primary bg-primary bg-secondary md:bg-secondary-md md:m-2'>
                <input className="p-2 my-2 mx-4" type="email" placeholder="email@mail.com" onChange={(e) => { setEmail(e.target.value) }} />
                <input className="p-2 my-2 mx-4" type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                <input className="p-2 my-2 mx-4 button-primary" type="submit" value= "Submit"/>
            </form>
    );
}

export default CleanupFunction;