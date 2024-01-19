import AddIcon from '../icons/AddIcon.svg';
import { NavLink } from 'react-router-dom';

const AddCategoryButton = () => {

    return (
        <div className='sticky top-[85%] left-4 md:left-8 mb-2 inline-block rounded-full text-4xl font-semibold boton-transparente z-10'>
            <NavLink to='/addcategory' title='Add Category'>
                <img src={AddIcon} className='p-4'/>
            </NavLink>
        </div>
    )
}
export default AddCategoryButton;