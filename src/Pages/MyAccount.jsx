import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Avatar, Tooltip } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import useFetch from '../Utils/useFetch.js'
import ModalLoading from '../components/ModalLoading.jsx';

const MyAccount = () => {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();
    const [name, setName] = useState(' ');
    const [email, setEmail] = useState(' ');
    const [date, setDate] = useState(' ');

    const getUserHandler = (res, data)=> {

        if (res.status == 200){
            setName(data.data.user.username);
            setEmail(data.data.user.email);
            setDate(data.data.user.createdAt);
        }else{
            setDate('dd/mm/yyyy');
        }
    }

    useEffect(()=>{
        sendHttpRequest('/api/users', "GET", null, getUserHandler);
    }, []);

    if (errorMessage) {
        console.log("errorMessage"); console.log(errorMessage);
        navigate('/error');
    }

    return (
        <div className='p-12 sm:p-32 pt-24 min-h-[94vh] bg-secondary'>
            {
                loading? <ModalLoading/> : <></>
            }
            <Card className="mx-auto max-w-sm overflow-hidden pt-12" color='blue-gray'>
                <CardHeader>
                    <Typography variant="h5" className="text-center p-1 sm:p-1 md:p-2">
                        Mi Cuenta
                    </Typography>
                </CardHeader>
                <CardBody>
                    <Typography variant="h6" className="">
                        Nombre
                    </Typography>
                    <Typography variant="paragraph" className="text-color-white capitalize -mt-1 mb-2 h-6">
                        {name}
                    </Typography>
                    <Typography variant="h6" className="">
                        E-mail
                    </Typography>
                    <Typography variant="paragraph" className="text-color-white -mt-1 mb-2 h-6"> 
                        {email}
                    </Typography>
                    <Typography variant="h6" className="">
                        Registrado
                    </Typography>
                    <Typography variant="paragraph" className="text-color-white -mt-1 mb-2 h-6"> 
                        {date}
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default MyAccount;