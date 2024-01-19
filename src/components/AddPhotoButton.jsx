import AddPhotoIcon from '../icons/AddPhotoIcon.svg'
import { Link } from 'react-router-dom'

const AddPhotoButton = ({categoryActive}) => {
    return (
        <div className=' sticky top-[85%] left-[88%] mb-2 inline-block rounded-full text-4xl font-semibold boton-transparente z-10'>
            <Link to={`/addPhotos/${categoryActive.category_id}`} title='Add Photo'>
                <img src={AddPhotoIcon} className='p-4'/>
            </Link>
        </div>
    )
}

export default AddPhotoButton;

