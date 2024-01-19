import React, { useEffect, useState } from 'react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import Card from '../components/Card';
import useConfirmDelete from '../Utils/useConfirmDelete';
import useModalDialog from '../Utils/useModalDialog';
import ModalLoading from '../components/ModalLoading';

function RemoveUser({ user }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [users, setUsers] = useState([]);
    const [usuario, setUsuario] = useState("null");

    const [email, setEmail] = useState("");

    const [AcceptDialog, setModalDialog, acceptDialog] = useModalDialog();

    const [ConfirmDeleteDialog, confirmDelete] = useConfirmDelete("Eliminar usuario", "Esta seguro que desea eliminar el usuario", usuario); // return a Component and a function

    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, trigger, getValues, formState: { errors, isValid } } = useForm({
        mode: "onChange"    // necesario para la propiedad isValid, para que compruebe si es valido el formulario en cada entrada al input
    });

    const getUsers = (res, data) => {
        setUsers(data.data.users);
    }

    const requestUsers = () => {
        sendHttpRequest("/api/users", "GET", null, getUsers);
    }

    useEffect(() => {
        // solo se solicita la lista de usuarios si el usuario es Admin.
        if (user.isAdmin) {
            requestUsers();
        }
    }, []);

    // setea el email del usuario seleccionado en el input select
    const selectOnClick = (e) => {
        const arr = getValues("nombre").split(",");
        if (arr[1] == undefined) {
            setEmail("")
        } else {
            setEmail(arr[1]);
        }
    }

    const deleteUser = async (res, data) => {

        if (res.status == 200) {
            setModalDialog("Exito", "El usuario ha sido eliminado", false);
            let accepted = await acceptDialog();
            if (accepted || !accepted) {
                requestUsers();
                setEmail('');
                reset();
            }

        } else {
            setModalDialog("Error", "No fue posible eliminar el usuario", true);
            acceptDialog();
        }
    }

    // data.nombre.split(",")[0];  // id del usuario a eliminar
    // data.nombre.split(",")[1];  // mail del usuario a eliminar
    // data.nombre.split(",")[2];  // nombre del usuario a eliminar

    const onSubmit = async (data) => {
        const usuario = data.nombre.split(",")[2];
        setUsuario(usuario);
        // setConfirmDelete("Eliminar usuario", "Esta seguro que desea eliminar el usuario "+usuario+"?");
        const confirm = await confirmDelete();  // promesa del hook useConfirm();

        let formData = new FormData();
        formData.append("userId", data.nombre.split(",")[0]);

        if (confirm) {
            sendHttpRequest("/api/users", "DELETE", formData, deleteUser);
        }
    }

    // Error
    if (errorMessage) {
        navigate('/error');
    }
    // If user is not Admin
    if (!user.isAdmin) {
        return (
            <Layout >
                <h2 className='underline p-2 text-2xl'>Eliminar Usuario</h2>
                <p className='p-2 text-base'>Solo el administrador puede eliminar un usuario.</p>
            </Layout>
        )
    }

    return (
        <div>
            {/* ConfirmDeleteDialog se muestra y oculta cuando se espera a confirmDelete() */}
            <ConfirmDeleteDialog />

            <AcceptDialog />
            {
                loading && <ModalLoading/> /* */
            }    

            <Layout>
                <Card>
                    <h3 className='p-4 text-center underline text-lg font-medium'>Eliminar Usuario</h3>

                    <form className='p-2 pt-4' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor='nombre'>Nombre: &nbsp;</label>
                        <select name="nombre" className='m-0 p-1 w-1/2 capitalize' onClick={selectOnClick} id="nombre"
                            {...register("nombre", { required: "Seleccione un usuario" })} >
                            <option value="" className='text-center'>...</option>
                            {
                                users.map((u, index) => {
                                    return <option key={index} value={`${u._id},${u.email},${u.username}`} className='capitalize text-center'>{u.username}</option>
                                })
                            }
                        </select>
                        {errors.nombre ? <p className='text-error h-6'>{errors.nombre.message}</p> : <p className='h-6'></p>}

                        <br />
                        <label htmlFor='email'>E-mail: &nbsp;</label>
                        <input className='text-center' disabled value={email} title={email} id="email"/>
                        <br />
                        <br />

                        <input type='submit' value="Eliminar" className='boton'></input>
                    </form>
                </Card>
            </Layout>
        </div>
    )
}

export default RemoveUser;