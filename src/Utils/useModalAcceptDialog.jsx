import  { useState } from 'react';
import ModalDialog from '../components/ModalDialog.jsx';

// utiliza el componente ModalDialog
const useModalAcceptDialog = () => {

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
    
    const handleCancel = () => {
        promise?.resolve(false); // promise ejecuta el metodo resolve y devuelve false.
        handleClose();
    };

    const setModalAcceptDialog = (title, message, warning) => {
        setTitle(title);
        setMessage(message);
        setWarning(warning);
    }

    const ModalAcceptDialog = () => (
        <ModalDialog open={promise !== null} warning={warning} title={title} message={message}
            handleAccept={handleAccept} handleCancel={handleCancel} handleClose={handleClose}
        />
    );
    return [ModalAcceptDialog, setModalAcceptDialog, acceptDialog];
};

export default useModalAcceptDialog;