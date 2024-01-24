import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, Typography } from '@material-tailwind/react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDialog from '../Utils/useModalDialog';
import checkIcon from '../icons/checkIcon.svg'

function Note({ _id, title, description, color, refreshNotes, cardActive, setCardIdActive }) {
    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [card, setCard] = useState({ _id, title, description });
    const [prevCard, setPrevCard] = useState({});
    const [ModalDialog, setModalDialog, acceptDialog] = useModalDialog();

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
        <Card name="card" id={card._id} ref={cardRef} onClick={e => onClickHandler(e)} onFocus={e => cardOnFocus(e)} onBlur={e => cardOnBlur(e)}
            className={cardActive ? classCardActive : classCardInactive}
        >
            <ModalDialog />

            {/* div transparente. Evita que se abra el teclado al hacer click en la nota cuando esta inactiva. Cuando esta activa desaparece y permite enfocar los inputs.*/}
            <div className={`${!cardActive ? "z-10 absolute top-0 left-0 h-full w-full" : ""}`}></div>

            {/* delete button */}
            {
                cardActive ?
                    <div className='absolute right-2 top-0'>
                        <button className='h-4' onClick={() => deleteNote(card._id)}>
                            <img src={closeIcon2} className='h-2 hover:scale-125 active:scale-90' />
                        </button>
                    </div>
                    :
                    <></>
            }

            <input type="text" name='title' ref={titleRef}
                className="bg-inherit focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2 disabled:bg-inherit"
                value={card.title} onChange={e => setCard({ ...card, title: e.currentTarget.value })} />

            <textarea name="description" ref={descriptionRef}
                className="h-full resize-none bg-inherit focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide disabled:bg-inherit"
                value={card.description} onChange={e => setCard({ ...card, description: e.currentTarget.value })}
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

