import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@material-tailwind/react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDelete from '../Utils/useModalDelete.jsx';
import checkIcon from '../icons/checkIcon.svg'

function Note({ _id, title, description, color, refreshNotes, noteActive, setIdNoteActive, scrollToLastNote, setScrollToLastNote }) {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [note, setNote] = useState({ _id, title, description });
    const [prevNote, setPrevNote] = useState({});
    const [ModalDeleteDialog, setModalDelete, acceptDelete] = useModalDelete();
    const [cardDeleted, setCardDeleted] = useState(false);

    const animationChechWithoutVanish = 'svg-color-blue block opacity-0';   // - vanish
    const animationChechWithVanish = 'svg-color-blue block vanish opacity-0'; // + navish
    const [animationCheck, setAnimationCheck] = useState(animationChechWithoutVanish);

    const classCardInactive = `transition duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 ${color} relative card`;
    const classCardActive = `transition scale-125 duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 ${color} relative card`;

    const navigate = useNavigate();
    const cardRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        // carga la animacion vanish luego de hacer algun cambio en las notas. Si no la primera vez que carga la pagina en todas las notas se ejecuta el vanish.
        if (loading) {
            setAnimationCheck(animationChechWithVanish);
        }
    }, [loading]);

    if (errorMessage) {
        console.log("errorMessage  n\ ", errorMessage);
        navigate('/error');
    }

    const updateNoteHandler = (res, data) => {
        console.log(data);
        console.log('updated');
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
            console.log(`El ${element} ha cambiado. Guardar cambios.`);
            //update note
            // solo se actualiza el elemento que ha sido modificado. Title o description.
            sendHttpRequest(`/api/notes/${note._id}`, 'PUT', { [element]: newContent }, updateNoteHandler);
        } else {
            console.log(`El ${element} no cambió.`);
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

    return (
        <Card name="card" id={note._id} ref={cardRef} onClick={e => onClickHandler(e)} onFocus={e => cardOnFocus(e)} onBlur={e => cardOnBlur(e)}
            className={`${noteActive ? classCardActive : classCardInactive} ${cardDeleted ? ' transition scale-0 rotate-180 skew-x-12 odd:translate-x-96 odd:translate-y-[calc(100% * 2)] even:-translate-x-96 even:-translate-y-40 even:-rotate-180 duration-[2000ms]' : ' '}`}
        >
            <ModalDeleteDialog />

            {/* div transparente. Evita que se abra el teclado al hacer click en la nota cuando esta inactiva. Cuando esta activa desaparece y permite enfocar los inputs.*/}
            <div className={`${!noteActive ? "z-10 absolute top-0 left-0 h-full w-full" : ""}`}></div>

            {/* delete button */}
            {
                noteActive ?
                    <div className='absolute right-2 top-0'>
                        <button className='h-4' onClick={() => deleteNote(note._id)}>
                            <img src={closeIcon2} className='h-2 hover:scale-125 active:scale-90' />
                        </button>
                    </div>
                    :
                    <></>
            }

            <input type="text" name='title' ref={titleRef}
                className="bg-inherit focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2 disabled:bg-inherit"
                value={note.title} onChange={e => setNote({ ...note, title: e.currentTarget.value })}
                maxLength={50} />

            <textarea name="description" ref={descriptionRef}
                className="h-full resize-none bg-inherit focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide disabled:bg-inherit"
                value={note.description} onChange={e => setNote({ ...note, description: e.currentTarget.value })}
                maxLength={2000}
            />
            {/* Loading and save icons */}
            <div className='absolute right-1 w-6 bottom-0 text-2xl text-light-blue-900'>
                {
                    loading ?
                        <span className='load-typing text-inherit'>....</span>
                        :
                        <img src={checkIcon} className={animationCheck} />
                }
            </div>

        </Card >
    )
}

export default Note;

