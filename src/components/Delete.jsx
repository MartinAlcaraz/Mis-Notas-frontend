import deleteIcon from '../icons/deleteIcon.svg';
import ModalDelete from './ModalDelete';
import { useState } from 'react';

const Delete = ({ category, deleteCategory }) => {
    const [showDelete, setShowDelete] = useState(false);

    const handleDelete = () => {
        setShowDelete(true);
    }

    return (
        <>
            <img src={deleteIcon} className='h-7 hover:cursor-pointer' onClick={handleDelete}></img>
            {
                showDelete? <ModalDelete setShowDelete={setShowDelete} category={category} deleteCategory= {deleteCategory}/> : <></>
            }
        </>
    )
}

export default Delete;