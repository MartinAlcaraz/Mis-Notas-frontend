import React, { useEffect, useState, createRef, memo } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import noteIcon from '../icons/note.svg'
import NotePublic from '../components/NotePublic';

const defaultNotes = [
    { _id: 1, title: "Crea tus notas", shared: false, noteUpdatedAt: '1/2/2024', description: "Agrega el contenido de tu nota." },
    { _id: 2, title: "Comparte tus notas", shared: true, noteUpdatedAt: '2/2/2024', description: "Comparte las notas que quieras con todos los usuarios." },
    { _id: 3, title: "Registrate", shared: false, noteUpdatedAt: '3/2/2024', description: "Registrate y crea tus notas." },
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

    const [notes, setNotes] = useState([]);
    const [idNoteActive, setIdNoteActive] = useState(null);
    const [scrollToLastNote, setScrollToLastNote] = useState(false);

    function randomId() {
        const min = 4;
        const max = 10000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    useEffect(() => {
        window.scroll(0, 0);
        //carga las notas por defecto
        setNotes(defaultNotes);
    }, []);

    useEffect(() => {
        // si se crea una nota nueva se desplaza la pantalla hasta la nota nueva
        if (scrollToLastNote) {
            const newNote = document.getElementById(notes[notes.length - 1]._id);
            const y = newNote.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 4);
            window.scroll({
                top: y,
                behavior: 'smooth'
            });

            setScrollToLastNote(false);
        }
    }, [scrollToLastNote]);

    function refreshNotes(id) {
        // actualiza la lista de notas eliminando la nota con el id
        let aux = []

        notes.forEach(c => {
            if (c._id !== id) {
                aux.push(c);
            }
        });
        setTimeout(() => {
            setNotes(aux);
        }, 1500);
    }

    const addNote = () => {
        const random_id = randomId();
        setNotes([
            ...notes,
            { _id: random_id, title: 'New title', description: "Write something here.", shared: false, noteUpdatedAt: '3/2/2024' }
        ]);
        setIdNoteActive(random_id);
        // scroll a la ultima nota
        setScrollToLastNote(true);
    }

    const onClickHandler = (e) => {
        let element = e.target.getAttribute('name');
        if (element == "main-title" || element == "main-container") {
            setIdNoteActive(null);
        }
    }
    // console.log("Render Main")

    return (
        <main className='bg-primary min-h-screen relative py-8 md:py-12' onClick={e => onClickHandler(e)}>
            <Typography name="main-title" as="h2" className=" text-white text-center text-lg font-semibold leading-10 md:leading-[50px]">
                <img src={noteIcon} className='inline svg-color-white' />
            </Typography>
            <div name="main-container" className='flex flex-wrap justify-center gap-10 md:gap-14 min-h-[100vh] px-4 py-14 md:py-20'>
                {/* {
                    loading ? <ModalLoading /> : <></>
                } */}
                {
                    notes.map(n => {
                        return <NotePublic
                            _id={n._id} title={n.title} description={n.description} key={n._id}
                            updatedAt={n.noteUpdatedAt} shared={n.shared}
                            noteActive={idNoteActive == n._id} setIdNoteActive={setIdNoteActive}
                            refreshNotes={refreshNotes}
                        />
                    })
                }

            </div>
            {/* @custom-mq:hidden hide the button if virtual keyboard appears, because the screen height is less than 300px */}
            <div className='sticky left-[85%] bottom-5 text-right inline @custom-mq:hidden'>
                <Button title='Add note' onClick={() => addNote()} size='sm' className='p-1 w-10 h-10 rounded-full text-2xl bg-blue-700 shadow-black'>
                    +
                </Button>
            </div>
        </main>
    )
}

export default memo(Main);