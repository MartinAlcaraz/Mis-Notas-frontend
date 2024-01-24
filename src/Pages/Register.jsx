import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ModalLoading from '../components/ModalLoading';
import { useForm } from 'react-hook-form';
import useFetch from '../Utils/useFetch';
import { Card, Input, Typography, Button } from "@material-tailwind/react";
import useNotificationDialog from '../Utils/useNotificationDialog';

const Register = () => {

    const { register, handleSubmit, trigger, setError,  formState: { errors } } = useForm();
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();
    const [NotificationDialog, acceptNotificationDialog] = useNotificationDialog()

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    // funcion que recibe las respuesta de la peticion
    async function registerHandler(res, data) {

        if (res.status == 201) {
            const accept = await acceptNotificationDialog();
            if (accept || !accept) {
                navigate('/');
            }

        } else {
            if (res.status >= 400 && res.status < 500) {
                setError('password', { message: data.message });                        
            } else {
                navigate('/error');
            }
        }
    }

    const onsubmit = async (data, e) => {
        // const formData = new FormData()        // formData.append('userName', data.nombre);        // formData.append('password', data.password);
        const formData = {
            "username": data.nombre,
            "email": data.email,
            "password": data.password
        }

        sendHttpRequest('/api/auth/signup', "POST", formData, registerHandler);
    }

    if (errorMessage) {
        console.log("errorMessage"); console.log(errorMessage);
        navigate('/error');
    }

    return (
        <div className='py-16 px-[15%] sm:px-[25%] md:px-[30%] lg:px-[35%] min-h-[90vh] bg-secondary'>

            {
                loading ? <ModalLoading /> : <></>
            }

            {/* Notificacion modal de exito en el registro. 
                Se renderiza cuando se ejecuta acceptNotificationDialog() que devuelve una promesa. */}
            <NotificationDialog title='Registro exitoso!' message='Usted se ha registrado satisfactoriamente.'/>

            <h2 className='mx-auto mb-6 text-center text-3xl font-semibold text-color-white textshadow'>Registrarse</h2>

            <form onSubmit={handleSubmit(onsubmit)} className="my-4 mx-auto flex flex-col items-center">

                <Typography variant="h6" className="-mb-3 text-color-white textshadow">
                    Nombre
                </Typography>

                <Input type='text' name="nombre" size="md" placeholder="Nombre" autoComplete="off"
                    className="!border-blue-gray-200  my-4 text-color-white entrada-1"
                    labelProps={{
                        className: "before:content-none after:content-none"
                    }}
                    {...register('nombre', {
                        required: "El nombre es requerido",
                        maxLength: { value: 10, message: "Nombre muy largo." },
                        minLength: { value: 2, message: "Nombre muy corto." },
                        pattern: { value: /^[A-Za-z.]+$/, message: "No se permiten caracteres especiales" },
                        // validate: {
                        //     nameExist: (value) => (nombreExiste(value)) || "El nombre de usuario ya existe."
                        // }
                    })}
                />
                {
                    errors.nombre ? <p className='font-medium text-base text-error textshadow-sm text-center h-6 my-4'>{errors.nombre.message}</p> : <p className='my-4 h-6'></p>
                }

                <Typography variant="h6" className="-mb-3 text-color-white textshadow">
                    E-mail
                </Typography>

                <Input type="email" size="md" name="email" placeholder="e-mail" autoComplete="on"
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
                    Password
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
                    <input type="submit" className="w-full py-2 px-4 bg-transparent text-base cursor-pointer" value="Aceptar" />
                </Button>

            </form>

            {/* <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col-reverse gap-4 items-center sm:flex-row">

                <input type='text' name="nombre" className="p-2 m-2 mx-auto rounded-md" placeholder="Nombre de usuario"
                    {...register('nombre', {
                        required: "El nombre es requerido",
                        maxLength: { value: 10, message: "Nombre muy largo." },
                        minLength: { value: 2, message: "Nombre muy corto." },
                        pattern: { value: /^[A-Za-z]+$/, message: "No se permiten caracteres especiales" },
                        validate: {
                            nameExist: (value) => (nombreExiste(value)) || "El nombre de usuario ya existe."
                        }
                    })}
                />
                {
                    errors.nombre ? <div className='text-sm text-red-500 text-shadow-warning text-center'>{errors.nombre.message}</div> : <></>
                }

            </form> */}
        </div>
    )
}

export default Register;