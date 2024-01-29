import { useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import Modal from "./Modal";

const ModalDelete = ({ open, title, message, handleConfirm, handleCancel }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    function handleButton(accept) {
        // handler para correr animacion de salida del dialogo.
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            if(accept){
                handleConfirm();
            }else{
                handleCancel();
            }
        }, 600);   // animation-duration: 0.6s;
    }

    return (
        <Modal isOpen={open} showClose={true} handleCancel={handleCancel}>
            {/* onClick = { e => e.stopPropagation() }  evita que se cierre la ventana al clickear en  Card */}
            <div className={`m-auto w-11/12 md:w-3/4 mt-[20vh] md:mt-[15vh] ${animacion}`} onClick={(e) => e.stopPropagation() }>
                <Card className="p-4 md:p-8">
                    <Typography variant="h4" className="text-center capitalize font-bold">{title}</Typography>
                    <Typography variant="paragraph" className="text-center p-4 mx-auto ">
                        {/* Esta seguro que desea eliminar la nota? */}
                        {message}
                    </Typography>
                    <div className="flex justify-around">
                        <Button  variant="filled" className="w-1/3 bg-gray-900 text-white shadow-gray-700 hover:shadow-gray-700" onClick={()=> handleButton(true)}>Si</Button>
                        <Button  variant="filled" className="w-1/3 bg-gray-900 text-white shadow-gray-700 hover:shadow-gray-700" onClick={()=> handleButton(false)}>No</Button>
                    </div>
                </Card>
            </div>
        </Modal>
    )
}

export default ModalDelete;