import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ModalLoading from '../components/ModalLoading.jsx';
import useFetch from '../Utils/useFetch.js';
import Card from '../components/Card.jsx';
import Layout from '../components/Layout.jsx';
import useModalDialog from '../Utils/useModalDialog.jsx';

function AddUser({ user }) {

    const { register, handleSubmit, reset, setError, trigger, getValues, formState: { errors, isValid } } = useForm({
        mode: "onChange"    // necesario para la propiedad isValid, para que compruebe si es valido el formulario en cada entrada al input
    });

    const navigate = useNavigate();

    const [allowShowLoading, setAllowShowLoading] = useState(false);

    const [errorMessage, loading, sendHttpRequest] = useFetch();

    const [AcceptDialog, setModalDialog, acceptDialog] = useModalDialog();

    const createNewUserHandler = async (res, data) => {

        if (res.status == 201) {
            setModalDialog("Exito", "El usuario se ha creado!", false);
            reset();
            acceptDialog();
        } else {
            if (res.status == 409) {
                setError("email", { message: "El email ya existe, usa otro." });
            } else {
                navigate('/error');
            }
        }
    }

    const onSubmit = async (data, e) => {
        const array = ['user'];

        let formData = new FormData();
        formData.append('username', data.nombre);
        formData.append('email', data.email);
        formData.append('password', data.password);

        array.forEach(elem => {                 // forma de agregar un array al formData, se agrega un elemento a la vez en el mismo campo, terminado en "[]"
            formData.append("roles[]", elem);    // el backend toma todos los campos "roles[]" y crea el array "roles" nuevamente.
        });

        sendHttpRequest('/api/users', "POST", formData, createNewUserHandler);
    }

    // Error
    if (errorMessage) {
        navigate('/error');
    }

    // isn't Admin
    if (!user.isAdmin) {
        return (
            <Layout >
                <h2 className='underline p-2 text-2xl'>Agregar Usuario</h2>
                <p className='p-2 text-base'>Solo el administrador puede agregar un usuario.</p>
            </Layout>
        )
    }


    useEffect(() => {
        if (loading) {
            setAllowShowLoading(true);
            setTimeout(() => {
                setAllowShowLoading(false);
            }, 1000);
        }
    }, [loading]);


    return (
        <div>
            {
                !(loading || allowShowLoading) && <AcceptDialog />   /* cuando se cierra el loading se muestra el mensage */
            }
            {
                (loading || allowShowLoading) && <ModalLoading />    /* permite mostrar el loading al menos 1 segundo */
            }
            <Layout>
                <Card>
                    <h1 className='text-xl text-center underline capitalize'>Agregar Usuario</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className='p-2 pt-4'>

                        {/*///////////////   Nombre   ////////////////*/}
                        <label htmlFor="nombre">Nombre del usuario: &nbsp;</label>
                        <br />
                        <input type="text" name="nombre" className='input' autoFocus id="nombre"
                            {...register("nombre", {
                                required: "El nombre es requerido.",
                                pattern: { value: /^[a-zA-Z'-.,\s\d]+$/, message: "El nombre no puede contener caracteres especiales." },
                                minLength: { value: 3, message: "Nombre muy corto." },
                                maxLength: { value: 15, message: "Nombre no puede tener mas de 15 caracteres." }
                            })} />
                        {errors.nombre ? <p className='text-error h-6'>{errors.nombre.message}</p> : <p className='h-6'></p>}

                        {/*///////////////   Email   ////////////////*/}
                        <label htmlFor="email">Email del usuario: &nbsp;</label>
                        <br />
                        <input type="email" name="email" className='input' id="email"
                            {...register("email", {
                                required: "El email es requerido.",
                                pattern: { value: /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/, message: "E-mail incorrecto." },
                                maxLength: { value: 30, message: "El email no puede tener mas de 50 caracteres." }
                            })} />
                        {errors.email ? <p className='text-error h-6'>{errors.email.message}</p> : <p className='h-6'></p>}

                        {/*///////////////   Password   ////////////////*/}
                        <label htmlFor="password">Password: &nbsp;</label>
                        <br />
                        <input type="password" name="password" className='input' id="password"
                            {...register("password", {
                                required: "El password es requerido.",
                                minLength: { value: 4, message: "El password muy corto." },
                                maxLength: { value: 10, message: "El password no puede tener mas de 10 caracteres." }
                            })} />
                        {errors.password ? <p className='text-error h-6'>{errors.password.message}</p> : <p className='h-6'></p>}

                        {/*///////////////  confirm Password   ////////////////*/}
                        <label htmlFor="confirmPassword">Confirm Password: &nbsp;</label>
                        <br />
                        <input type="password" name="confirmPassword" className='input' id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "El password es requerido.",
                                validate: (value) => getValues("password") == value || "El password no coincide."
                            })} />
                        {errors.confirmPassword ? <p className='text-error h-6'>{errors.confirmPassword.message}</p> : <p className='h-6'></p>}

                        <input type="submit" className='boton py-1 px-2' value="Agregar usuario" />

                    </form>
                </Card>
            </Layout>
        </div>
    )
}

export default AddUser;