import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from '@material-tailwind/react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDialog from '../Utils/useModalDialog';

function Note({ _id, title, description, color, updateNewNote, refreshNotes }) {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [card, setCard] = useState({ _id, title, description });
    const [prevCard, setPrevCard] = useState({});
    const navigate = useNavigate();

    const [ModalDialog, setModalDialog, acceptDialog] = useModalDialog();

    const createNoteHandler = (res, data) => {
        if (res.status == 201) {
            // para cambiar el id de la nota nueva, que fue creada con _id= 'newNote'
            updateNewNote(data.data.newNote);
        } else {
            // setCards([]);
            console.log('Failed to create note.')
        }
    }

    useEffect(() => {
        if (_id == 'newNote') {
            // focus new note
            document.getElementById("newNote").getElementsByTagName("input")[0].focus();
        }
    }, []);

    const updateNoteHandler = (res, data) => {
        console.log('updated');
    }

    if (errorMessage) {
        console.log("errorMessage  n\ ", errorMessage);
        navigate('/error');
    }

    const cardOnFocus = (e) => {
        // const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        // const content = e.target.value;
        setPrevCard(card);
    }

    const cardOnBlur = (e) => {
        const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        const newContent = e.target.value;

        if (card._id == 'newNote') {
            sendHttpRequest(`/api/notes/`, 'POST', card, createNoteHandler);
        } else {
            // compara el elemento que ha sido enfocado: title o description
            if (prevCard[element] !== newContent) {
                // save card changes
                console.log(`El ${element} ha cambiado. Guardar cambios.`);
                //update note
                // solo se actualiza el elemento que ha sido modificado. Title o description.
                sendHttpRequest(`/api/notes/${card._id}`, 'PUT', { [element]: newContent }, updateNoteHandler);
            } else {
                console.log(`El ${element} no cambió.`);
            }
        }
    }

    function deleteNoteHandler(res, data) {
        if (res.status == 200) {
            // if ok, refresh note list
            refreshNotes(data.data.deletedNote._id);
        } else {
            console.log(data.message);
            navigate('./error');
        }
    }

    const deleteNote = async (id) => {
        setModalDialog('Eliminar nota', 'Desea eliminar esta nota?', false);
        let accept = await acceptDialog();
        if (accept) {
            sendHttpRequest(`/api/notes/${id}`, 'DELETE', null, deleteNoteHandler);
        }
    }

    return (
        <>
            <ModalDialog />

            <Card id={card._id} onFocus={e => cardOnFocus(e)} onBlur={e => cardOnBlur(e)}
                className={`w-60 h-60 text-gray-900 shadow-black p-4 ${color} 
             hover:scale-125 transition-all 
            hover:[&:nth-child(n)]:rotate-0 hover:z-10 relative card`}>

                {/* delete button */}
                <div className='delete hidden absolute right-2 top-0 h-2'>
                    <button className='h-2 p-0 leading-3' onClick={() => deleteNote(card._id)}>
                        <img src={closeIcon2} className='h-2 image-delete' />
                    </button>
                </div>
                <input type="text" name='title' className="bg-inherit focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2"
                    value={card.title} onChange={e => setCard({ ...card, title: e.currentTarget.value })} />

                <textarea name="description"
                    className="h-full resize-none bg-inherit focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide"
                    value={card.description} onChange={e => setCard({ ...card, description: e.currentTarget.value })}
                />
                {/* Loading icon */}
                <div className='absolute right-1 w-6 bottom-[-2px] text-2xl text-light-blue-900'>
                    {
                        (_id === 'newNote') ?
                            <div>
                                {
                                    loading ? <span className='load-typing'>....</span> : <></>
                                }
                            </div> :
                            <div>
                                {loading ? <span className='load-typing'>....</span> : <span className='block text-right vanish opacity-0 text-3xl'>🗸</span>}
                            </div>
                    }
                </div>
            </Card >
        </>
    )
}

export default Note;

