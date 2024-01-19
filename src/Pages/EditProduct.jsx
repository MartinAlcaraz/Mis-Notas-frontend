import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ModalLoading from '../components/ModalLoading.jsx';
import useFetch from '../Utils/useFetch.js';
import Loading from '../components/Loading.jsx';
import Card from '../components/Card.jsx';
import errorImg from '../icons/errorImg.svg';
import iconImage from '../icons/imageIcon.svg';
import Modal from '../components/Modal.jsx';
import useModalDialog from '../Utils/useModalDialog.jsx';

const EditProduct = ({ closeEdit, openEdit, _id, name, price, description, category, imgURL, refreshData }) => {
    const { register, handleSubmit, reset, setError, trigger, setValue, formState: { errors, isValid } } = useForm({
        mode: "onChange"    // necesario para la propiedad isValid, para que compruebe si es valido el formulario en cada entrada al input
    });

    const navigate = useNavigate();

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [categories, setCategories] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false); // para evitar que el formulario se envíe mas de una vez

    const [AcceptDialog, setModalDialog, acceptDialog] = useModalDialog();

    const [loadingImg, setLoadingImg] = useState(false);
    const [selectedImg, setSelectedImg] = useState(imgURL);  // foto actual del producto

    // Image function
    async function cargarImagen(file) {
        // trigger comprueba los errores del input selecteFile  (es funcion asincrona )
        const archivoValido = await trigger("inputFile");
        setSelectedImg(null);

        if (archivoValido) {
            setLoadingImg(true);
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (event) {
                let imagen = event.target.result;
                setSelectedImg(imagen);
                setLoadingImg(false);
            }
        } else {
            setSelectedImg(errorImg);
        }

    }

    // Image function 
    function addImage(e) {
        e.preventDefault();
        const inputFile = document.querySelector("#inputFile");
        inputFile.click();
    }

    const editProductHandler = async (res, data) => {
        console.log(res);
        console.log(data);
        if (res.status == 200) {
            setModalDialog("Exito", "El producto se ha modificado!", false);
            setSelectedImg(iconImage);
            let accepted = await acceptDialog();
            if (accepted || !accepted) {
                reset();
            }
            refreshData();
        } else {
            if (res.status == 409) {
                setError("nombre", { message: "El nombre del producto ya existe." });
            } else {
                if (res.status == 403) {
                    setModalDialog("Error", "Solo el administrador puede editar los productos.", true);
                    setSelectedImg(iconImage);
                    let accepted = await acceptDialog();
                    if (accepted || !accepted) {
                        reset();
                    }
                } else {
                    navigate('/error');
                }
            }
        }

        setFormSubmitted(false);
    }

    const onSubmit = async (data, e) => {

        if (formSubmitted == false) {
            setFormSubmitted(true);

            let formData = new FormData();
            formData.append('categoryId', data.categoria);
            formData.append('name', data.nombre);
            formData.append('price', data.precio * 1);
            formData.append('description', data.descripcion);

            if (selectedImg !== imgURL) { // si no se elige una imagen de deja la anteriormente seleccionada.
                formData.append('image', data.inputFile[0]);
            }

            sendHttpRequest('/api/products/' + _id, "PUT", formData, editProductHandler);

            // se deshabilitan los inputs del formulario
            let elements = e.target.elements;
            for (let i = 0; i < elements.length; i++) {
                elements[i].disabled = true;
            }
        }
    }

    // rellena los valores del formulario
    function setValues() {
        setValue("nombre", name);
        setValue("precio", price);
        setValue("descripcion", description);
        setValue("categoria", category._id);
        setValue("inputFile", null);        // null para la validacion si no se elije ningun archivo de imagen.
    }

    const getCategories = (res, data) => {
        if (res.status == 200) {
            setCategories(data.data);
        } else {
            navigate('/error');
        }
    }

    // obtiene las categorias de todos los productos
    useEffect(() => {
        sendHttpRequest('/api/categories', "GET", null, getCategories);
    }, []);

    useEffect(() => {
        setValues();        // setea los valores del formulario luego de obtener las categorias.
    }, [categories]);

    if (errorMessage) { navigate('/error'); }

    if (!openEdit) { return; }

    return (
        <Modal isOpen={openEdit} close={closeEdit} showClose={true}>
            <AcceptDialog />
            {
                loading && formSubmitted && <ModalLoading /> // loading fetch
            }

            <Card style="m-4 py-2">

                <h3 className='text-center underline text-lg font-medium'>Editar producto</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='p-2 pt-4' >

                    {/*///////////////   Nombre   ////////////////*/}
                    <label htmlFor="nombre">Nombre: &nbsp;</label>
                    <input name="nombre" className='input' id="nombre"
                        {...register("nombre", {
                            required: "El nombre es requerido.",
                            pattern: { value: /^[a-zA-Z'-.,\s\d]+$/, message: "El nombre no puede contener caracteres especiales." },
                            minLength: { value: 3, message: "Nombre muy corto." },
                            maxLength: { value: 30, message: "Nombre no puede tener mas de 30 caracteres." }
                        })} />
                    {errors.nombre ? <p className='text-error h-6'>{errors.nombre.message}</p> : <p className='h-6'></p>}

                    {/*///////////   Categoria   /////////*/}
                    <label htmlFor="categoria">Categoria &nbsp;</label>
                    <select name="categoria" className='m-0 p-1' id="categoria"
                        {...register("categoria", { required: "Seleccione una categoria" })} >
                        <option value="" className=''>...</option>
                        {
                            categories.map((c, index) => <option key={index} value={c._id} className='capitalize'>{c.name}</option>)
                        }
                    </select>
                    {errors.categoria ? <p className='text-error h-6'>{errors.categoria.message}</p> : <p className='h-6'></p>}

                    {/*///////////   Imagen   ///////////*/}
                    <div className='h-[35vh] grid place-content-center'>
                        {
                            loadingImg ?
                                <Loading /> :
                                <div className='h-full hover:cursor-pointer' onClick={addImage} >
                                    <img src={selectedImg} className="h-[35vh] mx-auto object-contain" />
                                </div>
                        }
                    </div>
                    <div className='m-auto'>
                        <input type="file" className='hidden' name="inputFile" id="inputFile" accept="image/jpeg, image/png"
                            {...register('inputFile', {

                                // required: "Seleccione una imagen.",
                                validate: {
                                    // si value == null es porque no se selecciono una imagen, por lo tanto se utiliza la imagen anteriormente guardada.
                                    // si value != null se valida el archivo seleccionado.
                                    size: (value) => value == null ? true : ((value[0].size / 1024 < 6144) || "La imagen debe pesar menos de 6MB"),
                                    tipo: (value) => value == null ? true : ((["image/jpg", "image/jpeg", "image/png"].includes(value[0].type)) || "Elija otra imagen (.jpg, .jpeg ó .png)")
                                },

                                onChange: (value) => cargarImagen(value.target.files[0])
                            })} />
                        {errors.inputFile ? <p className='text-error text-center h-6'>{errors.inputFile.message}</p> : <p className='h-6'></p>}

                    </div>

                    {/*////////   Descripcion   ///////////*/}
                    <div className='flex'>
                        <label htmlFor="descripcion">Descripcion: &nbsp;</label>
                        <textarea name="descripcion" className='w-3/4 h-12 resize-none' id="descripcion"
                            {...register("descripcion", {
                                required: "La descripcion es requerida.",
                                pattern: { value: /^[a-zA-Z!'.,"&%$()#-\s\d]+$/, message: "La descripcion no puede contener caracteres especiales." },
                                minLength: { value: 3, message: "Descripcion muy corta." },
                                maxLength: { value: 500, message: "La descripcion no puede tener mas de 500 caracteres." }
                            })} />
                        {errors.descripcion ? <p className='text-error h-6'>{errors.descripcion.message}</p> : <p className='h-6'></p>}
                    </div>
                    <br />

                    {/*//////////   Precio   ////////////*/}
                    <label htmlFor="precio">Precio: $ </label>
                    <input type="number" step="0.01" name="precio" className='input' placeholder="0.00" id="precio"
                        {...register("precio", {
                            required: "El precio es requerido.",
                            min: { value: 0, message: "El precio no puede ser menor a $0" },
                            max: { value: 1000, message: "El precio no puede ser mayor a $1.000" }
                        })} />
                    {errors.precio ? <p className='text-error h-6'>{errors.precio.message}</p> : <p className='h-6'></p>}
                    <br />

                    <input type="submit" className='boton py-1 px-2' value="Editar Producto" />
                </form>
            </Card>
        </Modal>
    )
}

export default EditProduct;