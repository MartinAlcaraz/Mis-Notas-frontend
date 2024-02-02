import React, { useEffect, useState, createRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Utils/useFetch';
import ModalLoading from '../components/ModalLoading';
import Note from '../components/Note';

const defaultCards = [
    { _id: 1, title: "Title 1", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 2, title: "Title 2", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 3, title: "Title 3", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 4, title: "Title 4", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 5, title: "Title 5", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 6, title: "Title 6", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" },
    { _id: 7, title: "Title 7", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta hic nam dolor sequi voluptates rem, culpa optio facilis in ea necessitatibus architecto repellendus quidem temporibus doloribus. Iste reiciendis tempore ducimus!" }
]

//Returns an integer random number between min (included) and max (included):
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = [
    "bg-blue-700",
    "bg-deep-orange-800",
    "bg-green-600",
    "bg-yellow-700"
]

function Main({ user = null }) {

    const [cards, setCards] = useState([]);
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
        // obtiene las notas publicas
        // sendHttpRequest('/api/notes', "GET", null, getNotesHandler);
        window.scroll(0,0);
        setCards(defaultCards);
    }, []);

    if (errorMessage) {
        console.log("errorMessage"); console.log(errorMessage);
        navigate('/error');
    }
    
    // console.log("Render Main")

    return (
        <main className='bg-primary min-h-screen flex flex-wrap justify-center px-4 py-16 md:py-20 gap-8 md:gap-12'>
            {
                loading? <ModalLoading/> : <></>
            }
            {
                cards.map(c => {
                    return <Note key={c._id} _id={c._id} title={c.title} description={c.description} color={colors[randomInteger(0, colors.length - 1)]} />
                })
            }
            
        </main>
    )
}

export default memo(Main);