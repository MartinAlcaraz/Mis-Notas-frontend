import { useState } from "react";
import CloseIcon from '../icons/CloseIcon.jsx'
import TrashIcon from '../icons/TrashIcon.jsx'


const ModalView = ({ url, setModalView, deletePicture, img_public_id }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    function Eliminar() {
        setAnimacion(claseAnimacionOut);

        deletePicture(img_public_id);
        setTimeout(() => {
            setModalView(false);
        }, 550);
    }

    function Cancelar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            setModalView(false);
        }, 550);    // al desaparecer la ventana modal se elimina el componente del DOM
    }

    return (
        <div className={"flex bg-black/50 fixed h-screen w-screen top-0 left-0 z-20 " + animacion}>
            <div className="m-auto w-[80vw] h-[80vh] align-middle flex flex-col" onClick={Cancelar}>
                <div className="align-middle flex justify-between pb-2 px-4">
                    <button className="w-6 h-6" onClick={Eliminar} >
                        <TrashIcon className="text-slate-200 text-gray-100 hover:text-red-600 w-6 h-6"/>
                    </button>
                    <button className="w-6 h-6" onClick={Cancelar}>
                        <CloseIcon className="text-slate-200 text-gray-100 hover:text-blue-600 w-8 h-8"/>
                    </button>
                </div>
                <div className="align-middle">
                    <img className="w-full max-h-[80vh] object-contain" src={url} />
                </div>
            </div>
        </div>
    )
}

export default ModalView;