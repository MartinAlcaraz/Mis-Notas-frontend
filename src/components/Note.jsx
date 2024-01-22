import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Typography } from '@material-tailwind/react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDialog from '../Utils/useModalDialog';
import checkIcon from '../icons/checkIcon.svg'

function Note({ _id, title, description, color, updateNewNoteId, refreshNotes, cardActive, setCardIdActive }) {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [card, setCard] = useState({ _id, title, description });
    const [prevCard, setPrevCard] = useState({});
    const [ModalDialog, setModalDialog, acceptDialog] = useModalDialog();

    const classCardInactive = `transition duration-300 w-60 h-60 text-gray-900 shadow-black p-4 ${color} relative card`;
    const classCardActive = `transition scale-125 duration-300 w-60 h-60 text-gray-900 shadow-black p-4 ${color} relative card`;

    const navigate = useNavigate();
    const cardRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    if (errorMessage) {
        console.log("errorMessage  n\ ", errorMessage);
        navigate('/error');
    }

    const updateNoteHandler = (res, data) => {
        console.log('updated');
    }

    const cardOnFocus = (e) => {
        // const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        // const content = e.target.value;
        setPrevCard(card);
    }

    const cardOnBlur = (e) => {
        const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        const newContent = e.target.value;  // title: "new content" || decription: "new content in description"

        // compara el elemento que ha sido enfocado: title o description
        if ((element == 'title' || element == 'description') && prevCard[element] !== newContent) {
            // save card changes
            console.log(`El ${element} ha cambiado. Guardar cambios.`);
            //update note
            // solo se actualiza el elemento que ha sido modificado. Title o description.
            sendHttpRequest(`/api/notes/${card._id}`, 'PUT', { [element]: newContent }, updateNoteHandler);
        } else {
            console.log(`El ${element} no cambió.`);
        }

    }

    function deleteNoteHandler(res, data) {
        console.log("deleted")
        console.log(res.status)

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

    const onClickHandler = (e) => {
        setCardIdActive(e.currentTarget.id);
    }

    return (
        <>
            <ModalDialog />

            <Card name="card" id={card._id} ref={cardRef} onClick={e => onClickHandler(e)} onFocus={e => cardOnFocus(e)} onBlur={e => cardOnBlur(e)}
                className={cardActive ? classCardActive : classCardInactive}
            >

                {/* delete button */}
                {
                    cardActive ?
                        <div className='absolute right-2 top-0 h-2'>
                            <button className='h-2 p-0 leading-3' onClick={() => deleteNote(card._id)}>
                                <img src={closeIcon2} className='h-2 image-delete' />
                            </button>
                        </div>
                        :
                        <></>
                }

                <input type="text" name='title' ref={titleRef}
                    className="bg-inherit focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2"
                    value={card.title} onChange={e => setCard({ ...card, title: e.currentTarget.value })} />

                <textarea name="description" ref={descriptionRef}
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
                                {loading ? <span className='load-typing'>....</span> : <img src={checkIcon} className='block text-right vanish opacity-0 text-3xl'/>}
                            </div>
                    }
                </div>
            </Card >
        </>
    )
}

export default Note;

