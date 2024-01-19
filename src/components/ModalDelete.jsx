import { useState } from "react";
import Card from "./Card";
import Modal from "./Modal";

const ModalDelete = ({ open, title, message, keyword, handleConfirm, handleCancel }) => {


    return (
        <Modal isOpen={open} showClose={true} close={handleCancel}>
            <div className="m-auto w-3/4 pt-[25%]">
                <Card>
                    <h2 className="text-center capitalize font-bold">{title}</h2>
                    <p className="text-center p-4 mx-auto bg-primary border-primary ">
                        {/* Esta seguro que desea eliminar el usuario/producto sonic? */}
                        {message} <strong className="capitalize text-lg">{keyword}</strong> ?
                    </p>
                    <div className="flex justify-around">
                        <button className="button-primary w-1/3 " onClick={handleConfirm}>Si</button>
                        <button autoFocus className="button-primary w-1/3 " onClick={handleCancel}>No</button>
                    </div>
                </Card>
            </div>
        </Modal>
    )
}

export default ModalDelete;