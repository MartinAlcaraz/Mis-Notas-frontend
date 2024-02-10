import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import closeIcon2 from '../icons/closeIcon2.svg';
import useModalDelete from '../Utils/useModalDelete.jsx';
import sharedIcon from '../icons/sharedIcon.svg';
import notSharedIcon from '../icons/notSharedIcon.svg';
import useModalAcceptDialog from '../Utils/useModalAcceptDialog.jsx';

function NotePublic({ _id, title, description, updatedAt, shared, noteActive, setIdNoteActive, refreshNotes }) {
    
    const [note, setNote] = useState({ _id, title, description, updatedAt, shared });

    const [ModalDeleteDialog, setModalDelete, acceptDelete] = useModalDelete();
    const [cardDeleted, setCardDeleted] = useState(false);

    const [ModalAcceptDialog, setModalAcceptDialog, acceptDialog] = useModalAcceptDialog();

    const classCard = 'transition duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 pt-5 relative card-textured-green ';
    const classCardInactive = classCard;
    const classCardActive = classCard + ` scale-125 `;

    const cardRef = useRef();

    const deleteNote = async (id) => {
        setModalDelete('Eliminar nota', 'Desea eliminar esta nota?');
        let accept = await acceptDelete();
        if (accept) {
            setCardDeleted(true);
            refreshNotes(id);
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

    const shareNoteOnClick = async (id) => {
        setModalAcceptDialog('Compartir Nota', 'Desea compartir esta nota?');
        let accept = await acceptDialog();
        if (accept) {
            console.log('compartir!')
            if (!note.shared) {
                setNote({ ...note, shared: true });
            }
        } else {
            console.log('No compartir')
            if (note.shared) {
                setNote({ ...note, shared: false });
            }
        }
    }

    return (
        <Card name="card" id={note._id} ref={cardRef} onClick={e => onClickHandler(e)}
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
                className="bg-transparent focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2 disabled:bg-inherit"
                value={note.title} onChange={e => setNote({ ...note, title: e.currentTarget.value })}
                maxLength={50} />

            <textarea name="description"
                className="h-full resize-none bg-transparent focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide disabled:bg-inherit"
                value={note.description} onChange={e => setNote({ ...note, description: e.currentTarget.value })}
                maxLength={2000}
            />

            {/* Share Icon */}

            <div className='w-4 h-4 absolute bottom-1 left-[48%]'>
                <button className='w-full' onClick={() => shareNoteOnClick(note._id)}>                    
                    {
                        note.shared ?
                            <img className='w-3 h-3 mx-auto' src={sharedIcon} alt='Shared' title='Shared note' />
                            :
                            noteActive ?
                                <img className='w-3 h-3 mx-auto' src={notSharedIcon} alt='Not Shared' title='Unshared note' />
                                :
                                <></>
                    }
                </button>
            </div>

        </Card >
    )
}

export default NotePublic;
