import React, { useState } from 'react';
import ModalMessage from '../components/ModalMessage';

// utiliza el componente ModalMessage
const useModalDialog = () => {

    const [title, setTitle] = useState("Titulo");
    const [message, setMessage] = useState("Mensaje");
    const [warning, setWarning] = useState(false);

    const [promise, setPromise] = useState(null); // promise == null

    const acceptDialog = () => new Promise((resolve, reject) => {
        setPromise({ resolve });  // promise == Promise .La variable de estado promise se setea como Promise y permite ver el componente <Dialog/>
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleAccept = () => {
        promise?.resolve(true); // promise ejecuta el metodo resolve y devuelve true.
        handleClose();
    };

    const setModalDialog= (title, message, warning) => {
        setTitle(title);
        setMessage(message);
        setWarning(warning);
    }

    const ModalDialog = () => (
        <ModalMessage open={promise !== null} warning={warning} title={title} 
            message={message} handleAccept={handleAccept} handleClose={handleClose}
        />
    );
    return [ModalDialog, setModalDialog, acceptDialog];
};

export default useModalDialog;