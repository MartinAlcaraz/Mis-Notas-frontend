import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@material-tailwind/react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDelete from '../Utils/useModalDelete.jsx';
import checkIcon from '../icons/checkIcon.svg';
import sharedIcon from '../icons/sharedIcon.svg';
import notSharedIcon from '../icons/notSharedIcon.svg';
import useModalAcceptDialog from '../Utils/useModalAcceptDialog.jsx';
import dateformat from 'dateformat';

function Note({ _id, title, description, updatedAt, shared, color, refreshNotes, noteActive, setIdNoteActive }) {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [note, setNote] = useState({ _id, title, description, updatedAt: dateformat(updatedAt, 'dd/mm/yyyy'), shared });
    const [prevNote, setPrevNote] = useState({});

    const [savingText, setSavingText] = useState(false);

    const [ModalDeleteDialog, setModalDelete, acceptDelete] = useModalDelete();
    const [cardDeleted, setCardDeleted] = useState(false);

    const [ModalAcceptDialog, setModalAcceptDialog, acceptDialog] = useModalAcceptDialog();

    const animationChechWithoutVanish = 'svg-color-blue block opacity-0';   // - vanish
    const animationChechWithVanish = 'svg-color-blue block vanish opacity-0'; // + vanish
    const [animationCheck, setAnimationCheck] = useState(animationChechWithoutVanish);

    const classCardInactive = `transition duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 ${color} relative card`;
    const classCardActive = `transition scale-125 duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 ${color} relative card`;

    const navigate = useNavigate();
    const cardRef = useRef();

    useEffect(() => {
        // carga la animacion vanish luego de hacer algun cambio en las notas. Si no la primera vez que carga la pagina en todas las notas se ejecuta el vanish.
        if (savingText) {
            setAnimationCheck(animationChechWithVanish);
        }
    }, [loading]);

    if (errorMessage) {
        console.log("errorMessage  n\ ", errorMessage);
        navigate('/error');
    }

    const updateNoteHandler = (res, data) => {
        // console.log(data.data.newNote.updatedAt);
        if (res.status == 200) {
            setNote({ ...note, updatedAt: dateformat(data.data.newNote.noteUpdatedAt, 'dd/mm/yyyy') });
            setSavingText(false);
        } else {
            navigate('/error');
        }
    }

    const cardOnFocus = (e) => {
        // const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        // const content = e.target.value;
        // set the previous note
        setPrevNote(note);
    }

    const cardOnBlur = (e) => {
        const element = e.target.getAttribute("name")  // title or description. Focus on title or description
        const newContent = e.target.value;  // title: "new content" || decription: "new content in description"

        // compara el elemento que ha sido enfocado: title o description
        if ((element == 'title' || element == 'description') && prevNote[element] !== newContent) {
            // save card changes
            // console.log(`El ${element} ha cambiado. Guardar cambios.`);
            //update note
            // solo se actualiza el elemento que ha sido modificado. Title o description.
            setSavingText(true);
            sendHttpRequest(`/api/notes/${note._id}`, 'PUT', { [element]: newContent }, updateNoteHandler);
        } else {
            // console.log(`El ${element} no cambió.`);
        }

    }

    function deleteNoteHandler(res, data) {
        if (res.status == 200) {
            // if ok, refresh note list
            refreshNotes(data.data.deletedNote._id);
        } else {
            // console.log(data.message);
            navigate('/error');
        }
    }

    const deleteNote = async (id) => {
        setModalDelete('Eliminar nota', 'Desea eliminar esta nota?');
        let accept = await acceptDelete();
        if (accept) {
            setCardDeleted(true);
            sendHttpRequest(`/api/notes/${id}`, 'DELETE', null, deleteNoteHandler);
        }
    }

    const onClickHandler = (e) => {
        // only scroll one time in the same note, to avoid scrolling many times.
        if (!noteActive) {
            const y = e.currentTarget.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 4);
            window.scroll({
                top: y,
                behavior: 'smooth'
            });
        }
        setIdNoteActive(e.currentTarget.id);
    }


    function shareNoteHandler(res, data) {
        if (res.status == 200) {
            console.log('share ', data.data.message);
        } else {
            navigate('/error');
        }
    }

    const shareNoteOnClick = async (id) => {
        setModalAcceptDialog('Compartir Nota', 'Desea compartir esta nota?');
        let accept = await acceptDialog();
        if (accept) {
            console.log('compartir!')
            if (!note.shared) {
                sendHttpRequest(`/api/notes/shared/${id}`, 'PUT', { share: true }, shareNoteHandler);
                setNote({ ...note, shared: true });
            }
        } else {
            console.log('No compartir')
            if (note.shared) {
                sendHttpRequest(`/api/notes/shared/${id}`, 'PUT', { share: false }, shareNoteHandler);
                setNote({ ...note, shared: false });
            }
        }
    }

    return (
        <Card name="card" id={note._id} ref={cardRef} onClick={e => onClickHandler(e)} onFocus={e => cardOnFocus(e)} onBlur={e => cardOnBlur(e)}
            className={`${noteActive ? classCardActive : classCardInactive} 
             ${cardDeleted ? ` ${(cardRef.current.getBoundingClientRect().x > (window.innerWidth * 0.45)) ? ` scale-0 translate-x-96 rotate-180 duration-[2000ms] ` : ` scale-0 -translate-x-96 -rotate-180 duration-[2000ms] `} ` : ' '} `}
        >

            <ModalAcceptDialog />

            <ModalDeleteDialog />

            {/* div transparente. Evita que se abra el teclado al hacer click en la nota cuando esta inactiva. Cuando esta activa desaparece y permite enfocar los inputs.*/}
            <div className={`${!noteActive ? "z-10 absolute top-0 left-0 h-full w-full" : ""}`}></div>

            {/* delete button */}
            <div className='absolute right-2 top-0'>
                {/* date */}
                <span className='h-4 inline-block font-medium font-Cormorant-Garamond text-base mr-2'>{note.updatedAt}</span>

                <button className={`h-4 opacity-0 transition-opacity duration-500  ${noteActive ? ' inline opacity-100' : ' hidden '}`} onClick={() => deleteNote(note._id)}>
                    <img src={closeIcon2} className='h-2 hover:scale-125 active:scale-90' />
                </button>
            </div>

            <input type="text" name='title'
                className="bg-inherit focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2 disabled:bg-inherit"
                value={note.title} onChange={e => setNote({ ...note, title: e.currentTarget.value })}
                maxLength={50} />

            <textarea name="description"
                className="h-full resize-none bg-inherit focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide disabled:bg-inherit"
                value={note.description} onChange={e => setNote({ ...note, description: e.currentTarget.value })}
                maxLength={2000}
            />

            {/* Share Icon */}

            <div className='w-4 h-4 absolute bottom-1 left-[48%]'>
                <button className='w-full' onClick={() => shareNoteOnClick(note._id)}>
                    {
                        !noteActive ?
                            note.shared ?
                                <img className='w-3 h-3 mx-auto' src={sharedIcon} alt='Shared' title='Shared note' /> :
                                <></>
                            :
                            note.shared ?
                                <img className='w-3 h-3 mx-auto' src={sharedIcon} alt='Shared' title='Shared note' /> :

                                <img className='w-3 h-3 mx-auto' src={notSharedIcon} alt='Not Shared' title='Unshared note' />
                    }
                </button>
            </div>
            {/* Loading and save icons */}
            <div className='absolute right-1 w-6 bottom-0 text-2xl text-light-blue-900'>
                {
                    savingText ?
                        <span className='load-typing text-inherit'>....</span>
                        :
                        <img src={checkIcon} className={animationCheck} />
                }
            </div>

        </Card >
    )
}

export default Note;

