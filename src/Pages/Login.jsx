import React from "react";
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../components/ModalLoading';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import useFetch from "../Utils/useFetch";
import { Card, Input, Typography, Button } from "@material-tailwind/react";

const Login = () => {

    const { setLoggedUser } = useContext(UserContext);
    const [errorMessage, loading, sendHttpRequest] = useFetch();

    const { register, handleSubmit, setError, trigger, formState: { errors } } = useForm({ mode: 'onBlur' }); // mode: 'onBlur' checkea los errores on blur

    const navigate = useNavigate();

    // funcion que recibe las respuesta de la peticion
    function loginHandler(res, data) {
        if (res.status == 200) {
            setLoggedUser(data.data.user);

            navigate('/dashboard');
        } else {
            if (res.status == 401) {
                setError('password', { message: "Username or password invalid." });
            } else {
                navigate('/error');
            }
        }
    }

    //   SUBMIT   //
    const onsubmit = async (data, e) => {
        // const formData = new FormData();
        // formData.append("email", data.email);
        // formData.append("password", data.password);
        const formData = { "email": data.email, "password": data.password };
        sendHttpRequest('/api/auth/login', "POST", formData, loginHandler);
    };

    if (errorMessage) {
        console.log("errorMessage"); console.log(errorMessage);
        navigate('/error');
    }

    return (
        <div className='py-24 px-[15%] sm:px-[25%] md:px-[30%] lg:px-[35%] min-h-[90vh] bg-secondary'>
            {
                loading ? <ModalLoading /> : <></>
            }

            <h2 className='mx-auto my-4 text-center text-3xl font-semibold text-color-white textshadow'>Login</h2>

            <form onSubmit={handleSubmit(onsubmit)} className="mt-12 mx-auto flex flex-col items-center">

                <Typography variant="h6" className="-mb-3 text-color-white textshadow">
                    Your Email
                </Typography>

                <Input type="email" size="md" name="email" placeholder="e-mail" autoComplete="on" autoFocus="on"
                    className="!border-blue-gray-200  my-4 text-color-white entrada-1"
                    labelProps={{
                        className: "before:content-none after:content-none"
                    }}
                    {...register('email', {
                        required: "Ingrese el e-mail del usuario.",
                        pattern: { value: /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/, message: "E-mail incorrecto." }
                    })}
                />
                {
                    errors.email ? <p className='font-medium text-base text-error textshadow-sm text-center h-6 my-4'>{errors.email.message}</p> : <p className='my-4 h-6'></p>
                }


                <Typography variant="h6" className="-mb-3 -mt-3 text-color-white textshadow">
                    Your Password
                </Typography>
                <Input type='password' name="password" placeholder="Contraseña" title="Contraseña"
                    className=" !border-blue-gray-200  my-4 text-color-white "
                    labelProps={{
                        className: "before:content-none after:content-none"
                    }}
                    {...register('password', {
                        required: "Ingrese la contraseña.",
                        minLength: { value: 4, message: "Contraseña muy corta." },
                        maxLength: { value: 10, message: "La contraseña no puede tener mas de 10 caracteres." }
                    })}
                />
                {
                    errors.password ? <div className='font-medium text-base text-error textshadow-sm text-center h-6 my-4'>{errors.password.message}</div> : <div className='h-6 my-4'></div>
                }

                <Button variant="filled" color="blue" size="sm" className="w-52 p-0 bg-[#1b1b1b] shadow-none hover:shadow-none">
                    <input type="submit" className="w-full py-2 px-4 bg-transparent text-base cursor-pointer" value="Login"/>
                </Button>

            </form>
        </div>
    )
}

export default Login;