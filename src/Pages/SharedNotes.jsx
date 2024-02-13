import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../Utils/useFetch';
import ModalLoading from '../components/ModalLoading';
import NoteShared from '../components/NoteShared';
import { Typography } from '@material-tailwind/react';
import sharedIcon from '../icons/sharedIcon.svg'

export default function SharedNotes({ user = null }) {

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
        // console.log(e.currentTarget.getAttribute('name')); // elemento en el que ocurre el evento <main>
        // console.log(e.target.getAttribute('name')); // elemento clickaedo en <main>, <h2> <div> o <card>

        // setea cardActive en null si se clickea fuera de la nota
        let element = e.target.getAttribute('name');
        if ( element == "main-title" || element == "main-container") {
            setIdNoteActive(null);
        }
    }

    return (
        <main className='bg-primary min-h-screen relative py-8 md:py-12' onClick={e => onClickHandler(e)}>
            <Typography name="main-title" as="h2" className="text-white text-center text-lg font-semibold leading-10 md:leading-[50px]">
                Notas compartidas <img src={sharedIcon} className='inline svg-color-white'/>
            </Typography>
            <div name="main-container" className='flex flex-wrap justify-center gap-10 md:gap-14 min-h-[100vh] px-4 py-16 md:py-20'>
                {
                    loading ? <ModalLoading /> : <></>
                }
                {
                    sharedNotes.map(c => {
                        return <NoteShared
                            _id={c._id} title={c.title} description={c.description} key={c._id}
                            updatedAt={c.noteUpdatedAt} 
                            noteActive={idNoteActive == c._id} setIdNoteActive={setIdNoteActive}
                            shared={c.shared}
                        />
                    })
                }

            </div>
        </main>
    )
}