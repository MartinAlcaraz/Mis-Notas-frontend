import React, { useEffect, useState } from 'react'
import { PriceFormatter } from '../Utils/PriceFormatter';
import Card from './Card';
import editIcon from '../icons/editIcon.svg';
import deleteIcon from '../icons/deleteIcon2.svg'
import EditProduct from '../Pages/EditProduct.jsx';
import DeleteProduct from './DeleteProduct.jsx';

function Product({ _id, name, price, description, category, imgURL, edit = false, refreshData }) {

    const formattedPrice = PriceFormatter(price);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    function toggleDelete(){
        setOpenDelete(!openDelete);
    }

    function toggleOpen() {
        setOpenEdit(!openEdit);
    }

    function closeEdit() {
        setOpenEdit(false);
    }

    useEffect(() => {
        // si se abre el modal se deshabilita el scroll en el body
        document.querySelector('body').style.overflow = openEdit ? 'hidden' : 'auto';
    }, [openEdit]);

    return (
        <div >
            <Card _id={_id} category={category} >
                <div className='flex justify-between pb-2'>
                    {
                        edit &&
                        <button onClick={() => toggleDelete()}>
                            <img src={deleteIcon} className="h-5 w-5" />
                        </button>
                    }
                    {
                        edit &&
                        <button onClick={() => toggleOpen()}>
                            <img src={editIcon} className="h-7 w-7" />
                        </button>
                    }
                </div>
                <div className='flex justify-between'>
                    <h1 className='inline capitalize font-semibold'>{name}</h1>
                    <p className='float-right price'>$ {formattedPrice}</p>
                </div>
                <div className='h-[35vh] w-full p-2'>
                    <img className='shadow-md shadow-black mx-auto object-contain h-full' src={imgURL} />
                </div>
                <p className='capitalize text-gray-700'>{description}</p>
            </Card>
            {
                openEdit && <EditProduct openEdit={openEdit} closeEdit={closeEdit} _id={_id} name={name} price={price} description={description} category={category} imgURL={imgURL} refreshData={refreshData} />
            }
            {
                openDelete && <DeleteProduct isOpen={openDelete} closeDelete={toggleDelete} name={name} _id={_id} refreshData={refreshData}/>
            }
        </div>
    )
}

export default Product;