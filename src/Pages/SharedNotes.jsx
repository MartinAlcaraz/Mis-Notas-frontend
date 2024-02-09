import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Utils/useFetch';
import ModalLoading from '../components/ModalLoading';
// import { Button, Card, Typography } from '@material-tailwind/react';
import NoteShared from '../components/NoteShared';
import { Typography } from '@material-tailwind/react';
import sharedIcon from '../icons/sharedIcon.svg'

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

export default function Dashboard({ user = null }) {

    const [sharedNotes, setSharedNotes] = useState([]);
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();
    const [idNoteActive, setIdNoteActive] = useState(null);

    const getSharedNotesHandler = (res, data) => {
        console.log(res)
        console.log(data.data)

        if (res.status == 200) {
            setSharedNotes(data.data.sharedNotes);
        } else {
            setSharedNotes([]);
        }
    }

    const fetchNotes = () => {
        sendHttpRequest('/api/notes/shared', "GET", null, getSharedNotesHandler);
    }

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (user.isLogged) {
            fetchNotes();
        } else {
            setNotes([]);
            navigate('/');
        }
    }, [user.isLogged]);

    if (errorMessage) {
        console.log("errorMessage \n", errorMessage);
        navigate('/error');
    }

    function refreshNotes(id) {
        // actualiza la lista de notas eliminando la nota con el id eliminado de la BBDD.
        let aux = []

        sharedNotes.forEach(c => {
            if (c._id !== id) {
                aux.push(c);
            }
        });
        setSharedNotes(aux);
    }

    const onClickHandler = (e) => {
        // console.log(e.currentTarget); // elemento en el que ocurre el evento <main>
        // console.log(e.target); // elemento clickaedo en <main>, <div> o <card>

        // setea cardActive en null si se clickea fuera de la nota
        if (e.target == e.currentTarget) {
            setIdNoteActive(null);
        }
    }

    return (
        <main className='bg-primary min-h-screen relative pb-2'>
            <div className='h-8 md:h-12'/>
            <Typography as="h2" className="text-white text-center text-lg font-semibold leading-10 md:leading-[50px]">
                Shared Notes <img src={sharedIcon} className='inline svg-color-white'/>
            </Typography>
            <div onClick={e => onClickHandler(e)} className='flex flex-wrap justify-center gap-10 md:gap-14 min-h-[100vh] px-4 py-16 md:py-20'>
                {
                    loading ? <ModalLoading /> : <></>
                }
                {
                    sharedNotes.map(c => {
                        return <NoteShared
                            _id={c._id} title={c.title} description={c.description} key={c._id}
                            updatedAt={c.noteUpdatedAt} color={colors[2]} 
                            noteActive={idNoteActive == c._id} setIdNoteActive={setIdNoteActive}
                            shared={c.shared}
                        />
                    })
                }

            </div>
        </main>
    )
}