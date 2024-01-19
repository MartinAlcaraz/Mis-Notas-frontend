import React from 'react';
import { Card, Button } from '@material-tailwind/react';

const ModalExpiredLoggin = ({ setShowModalExpiredLoggin }) => {
    return (
        <div className="bg-black/50 fixed h-screen w-screen top-0 left-0 z-20 pt-[30vh] ">
            <Card className='w-4/5 md:w-1/3 p-8 m-auto'>
                <p className='text-center'>Su cuenta se ha cerrado.</p>
                <p className='text-center'>Inicie sesion otra vez.</p>
                <Button  onClick={ ()=>{ setShowModalExpiredLoggin(false)} }>Aceptar</Button>
            </Card>
        </div>
    )
}

export default ModalExpiredLoggin;