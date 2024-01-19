import React, { useEffect, useState } from 'react'
import useFetch from '../Utils/useFetch';
import useModalDialog from '../Utils/useModalDialog';
import useConfirmDelete from '../Utils/useConfirmDelete';
import ModalLoading from './ModalLoading';

function DeleteProduct({ closeDelete, name, _id, refreshData }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [AcceptDialog, setModalDialog, acceptDialog] = useModalDialog();

    const [ConfirmDeleteDialog, confirmDelete] = useConfirmDelete('Eliminar producto', 'Esta seguro que desea eliminar el producto', name); // return a Component and a function

    const handleDelete = async (res, data) => {
        if (res.status == 200) {
            setModalDialog("Exito", "El producto se ha eliminado!", false);
        } else {
            setModalDialog("Error", "Solo el administrador puede eliminar los productos.", true);
        }
        let accepted = await acceptDialog();
        if (accepted || !accepted) {
            closeDelete();
        }
        refreshData();
    }

    const deleteProduct = () => {
        sendHttpRequest('/api/products/' + _id, 'DELETE', null, handleDelete);
    }

    if (errorMessage) {
        navigate('/error');
    }

    async function deleteProd() {
        const confirm = await confirmDelete();  // promesa del hook useConfirm();
        if (confirm) {
            deleteProduct();
        } else {
            closeDelete();
        }
    }
    useEffect(() => {
        deleteProd();
    }, []);

    return (
        <div>
            {
                loading && <ModalLoading />
            }

            { /* ConfirmDeleteDialog se muestra y oculta cuando se espera a confirmDelete() */}
            < ConfirmDeleteDialog />

            { /* AcceptDialog se muestra y oculta cuando se espera a acceptDialog() */}
            <AcceptDialog />

        </div>
    )
}
export default DeleteProduct;