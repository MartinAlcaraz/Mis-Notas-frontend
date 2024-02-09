import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@material-tailwind/react';
import sharedIcon from '../icons/sharedIcon.svg';
import dateformat from 'dateformat';

function NoteShared({ _id, title, description, updatedAt, shared, color, noteActive, setIdNoteActive }) {

    const [note, setNote] = useState({ _id, title, description, updatedAt: dateformat(updatedAt, 'dd/mm/yyyy'), shared });

    const classCard = 'transition duration-300 w-4/5 max-w-[240px] h-60 text-gray-900 shadow-black p-4 pt-5 relative card-textured-green ';
    const classCardInactive = classCard;
    const classCardActive = classCard + ` scale-125 `;

    const cardRef = useRef();

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
        <Card name="card" id={note._id} ref={cardRef} onClick={e => onClickHandler(e)}
            className={`${noteActive ? classCardActive : classCardInactive}`}
        >

            {/* div transparente. Evita que se abra el teclado al hacer click en la nota cuando esta inactiva. Cuando esta activa desaparece y permite enfocar los inputs.*/}
            <div className={`${!noteActive ? "z-10 absolute top-0 left-0 h-full w-full" : ""}`}></div>

            <div className='absolute right-2 top-0'>
                {/* date */}
                <span className='h-4 inline-block font-medium font-Cormorant-Garamond text-base mr-2'>{note.updatedAt}</span>
            </div>

            <input type="text" name='title' disabled="on"
                className="bg-transparent focus:outline-none font-Lora font-bold text-2xl scrollbar-hide pb-2 disabled:bg-transparent"
                value={note.title} onChange={e => setNote({ ...note, title: e.currentTarget.value })}
                maxLength={50} />

            <textarea name="description" disabled="on"
                className="h-full resize-none bg-transparent focus:outline-none font-Lora leading-5 focus:leading-5 text-base focus:text-base overflow-y-hidden focus:overflow-scroll scrollbar-hide disabled:bg-transparent"
                value={note.description} onChange={e => setNote({ ...note, description: e.currentTarget.value })}
                maxLength={2000}
            />

            {/* Share Icon */}

            <div className='w-4 h-4 absolute bottom-1 left-[48%]'>
                {
                    note.shared ?
                        <img className='w-3 h-3 mx-auto' src={sharedIcon} alt='Shared' title='Shared note' />
                        :
                        <></>
                }
            </div>
        </Card >
    )
}

export default NoteShared;

