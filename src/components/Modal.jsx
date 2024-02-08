import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../icons/CloseIcon.jsx'

function Modal({ children, isOpen=false, showClose=true, handleClose  }) {
    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    if (!isOpen) {
        return null;
    }

    function closeModal(e) {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            handleClose();    // close() setea la variable isOpen en false;
        }, 500);   // animation-duration: 0.5s;
    }

    return createPortal(
        <div onClick={(e)=> closeModal(e)}
            className="min-h-[98vh] fixed pt-16 md:pt-20 pb-0 w-full h-full z-50 overflow-y-auto bg-gray-700/50 
                scrollbar-hide">
            <div className={" " + animacion}>
                { showClose && <button className="ml-auto block" onClick={()=> closeModal()}><CloseIcon className="h-6 w-6 mr-2 text-gray-100" /></button>}
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default Modal;