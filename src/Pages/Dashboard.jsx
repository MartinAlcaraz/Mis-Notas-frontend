import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Utils/useFetch';
import ModalLoading from '../components/ModalLoading';
import { Button, Card, Typography } from '@material-tailwind/react';
import Note from '../components/Note';

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

    const [notes, setNotes] = useState([]);
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();
    const [idNoteActive, setIdNoteActive] = useState(null);
    const [scrollToLastNote, setScrollToLastNote] = useState(false);

    const getNotesHandler = (res, data) => {
        if (res.status == 200) {
            setNotes(data.data.notes);
        } else {
            setNotes([]);
        }
    }

    const fetchNotes = () => {
        sendHttpRequest('/api/notes', "GET", null, getNotesHandler);
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

    useEffect(() => {
        // si se crea una nota nueva se desplaza la pantalla hasta la nota nueva
        if (scrollToLastNote) {
            const newNote= document.getElementById(notes[notes.length-1]._id);
            const y = newNote.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 4);
            window.scroll({
                top: y,
                behavior: 'smooth'
            });            

            setScrollToLastNote(false);
        }
    }, [scrollToLastNote]);

    if (errorMessage) {
        console.log("errorMessage \n", errorMessage);
        navigate('/error');
    }

    function createNoteHandler(res, data) {
        if (res.status == 201) {
            console.log('Note created.')
            setNotes(()=> [...notes, data.data.newNote]);

            setIdNoteActive(data.data.newNote._id);

            // cuando termina de re-renderizarse el componente, se desplaza la pantalla hasta la nueva nota.
            setScrollToLastNote(true);            

        } else {
            console.log('Failed to create note.')
        }
    }

    const addNote = () => {
        sendHttpRequest(`/api/notes/`, 'POST', { title: 'New title', description: "Write something here." }, createNoteHandler);
    }

    function refreshNotes(id) {
        // actualiza la lista de notas eliminando la nota con el id eliminado de la BBDD.
        let aux = []

        notes.forEach(c => {
            if (c._id !== id) {
                aux.push(c);
            }
        });
        setNotes(aux);
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
            <div onClick={e => onClickHandler(e)} className='flex flex-wrap justify-center gap-10 md:gap-14 min-h-[100vh] px-4 py-16 md:py-20'>
                {
                    loading ? <ModalLoading /> : <></>
                }
                {
                    notes.map(c => {
                        return <Note
                            _id={c._id} title={c.title} description={c.description} key={c._id}
                            color={colors[2]} refreshNotes={refreshNotes} 
                            scrollToLastNote={scrollToLastNote} setScrollToLastNote={setScrollToLastNote}
                            noteActive={idNoteActive == c._id} setIdNoteActive={setIdNoteActive}
                        />
                    })
                }

            </div>
            {/* @custom-mq:hidden hide the button if virtual keyboard appears, because the screen height is less than 300px */}
            <div className='sticky left-[85%] bottom-5 text-right inline @custom-mq:hidden'>
                <Button disabled={loading} onClick={() => addNote()} size='sm' className='p-1 w-10 h-10 rounded-full text-2xl bg-blue-700 shadow-black'>
                    +
                </Button>
            </div>
        </main>
    )
}