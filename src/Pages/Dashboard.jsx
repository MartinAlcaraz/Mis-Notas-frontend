import React, { useEffect, useState } from 'react';
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

    const [cards, setCards] = useState([]);
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const navigate = useNavigate();

    const getNotesHandler = (res, data) => {
        if (res.status == 200) {
            setCards(data.data.notes);
        } else {
            setCards([]);
        }
    }

    const fetchNotes = ()=> {
        sendHttpRequest('/api/notes', "GET", null, getNotesHandler);
    }

    useEffect(() => {
        if (user.isLogged) {
            fetchNotes();
        } else {
            setCards([]);
        }
    }, [user.isLogged]);

    if (errorMessage) {
        console.log("errorMessage \n", errorMessage);
        navigate('/error');
    }

    const addNote = ()=>{
        setCards([...cards, { _id:'newNote', title:'New title', description:"Write something here."}]);
    }

    const updateNewNote = (  newNote)=>{
        // se actualiza el _id de la nota nueva, que fue primero creada con _id = 'newNote'. Otra opcion seria hacer una solicitud de todas las notas con fetchNotes()

        setCards(cards.map(c=> {
            if(c._id === 'newNote'){
                return {_id: newNote._id, title: newNote.title, description: newNote.description};
            }
            return c;
        }));
    }

    function checkNewNote(){
        const card = cards[cards.length-1];
        // if new card is created, the button will be disabled.
        if (card && card._id == 'newNote'){
            return true;
        }else{
            return false;
        }
    }

    function refreshNotes(id){
        // actualiza la lista de notas eliminando la nota con el id eliminado de la BBDD.
        let aux= []
        
        cards.forEach( c => {
            if (c._id !== id){
                aux.push(c);
            }
        });
        setCards(aux);
    }
    console.log(cards.length);

    return (
        <main className='bg-primary min-h-[94vh] flex flex-wrap justify-center px-4 py-16 md:py-20 gap-8 md:gap-12 relative'>
            {
                loading? <ModalLoading/> : <></>
            }
            {
                cards.map(c => {
                    return <Note
                        _id={c._id} title={c.title} description={c.description} key={c._id}
                        color={colors[2]} updateNewNote={updateNewNote} refreshNotes={refreshNotes} 
                    />
                })
            }

            <div className='absolute bottom-5 right-5'>
                <Button disabled={checkNewNote()} onClick={()=> addNote()} size='sm' className=' p-1 w-10 h-10 rounded-full text-2xl bg-blue-700 shadow-black'>
                    +
                </Button>
            </div>
        </main>
    )
}