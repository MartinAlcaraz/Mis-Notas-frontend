import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import Modal from "./Modal";

const ModalMessage = ({ open, warning = false, title, message, handleAccept, handleClose }) => {
    return (
        <Modal isOpen={open} showClose={true} handleCancel={handleClose} >
            <div className="m-auto w-3/4 mt-[20%] md:mt-[10%]">
                <Card color='blue-gray' className="p-4">
                    <Typography variant='h5' className={` text-center capitalize font-bold`}>{title}</Typography>
                    <Typography variant='paragraph' className={(warning ? 'bg-warning' : 'bg-green') + ` text-center capitalize py-2 px-4 mx-auto rounded-md`}>
                        {message}
                    </Typography>
                    <div className="w-full text-center">
                        <Button autoFocus className="mx-auto my-4 button-primary py-2 w-2/5 rounded-md" onClick={handleAccept}>Aceptar</Button>
                    </div>
                </Card>
            </div>
        </Modal>
    )
}

export default React.memo(ModalMessage);