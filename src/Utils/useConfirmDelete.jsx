import { useState } from 'react';
import ModalDelete from '../components/ModalDelete';

// utiliza el componente ModalDelete
// message y keyword forman parte de la pregunta => Esta seguro que quiere eliminar a KEYWORD ?
const useConfirmDelete = (title, message, keyword) => {

    const [promise, setPromise] = useState(null); // promise == null

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve });  // promise == Promise .La variable de estado promise se setea como Promise y permite ver el componente <Dialog/>
    });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true); // promise ejecuta el metodo resolve y devuelve true.
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <ModalDelete open = {promise !== null}
            title = {title} message = {message} keyword={keyword}
            handleConfirm = {handleConfirm} handleCancel = {handleCancel}
        />
    );
    return [ConfirmationDialog, confirm];
};

export default useConfirmDelete;