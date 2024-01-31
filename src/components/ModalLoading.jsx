import { useState } from "react";
import { createPortal } from 'react-dom';
import Loading from "./Loading.jsx";

const ModalLoading = () => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    return createPortal(
        <div className={"bg-black/50 fixed w-full h-full top-0 left-0 z-50 pt-[30vh] " + animacion}>
            <div className="m-auto w-3/4">
                <div >
                    <Loading />
                    <p className="text-center text-xl text-gray-300">Loading...</p>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default ModalLoading;