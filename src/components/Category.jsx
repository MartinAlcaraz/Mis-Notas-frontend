import Delete from "./Delete";

const Category = ({ category, cambiarEstado, deleteCategory }) => {

    let classActive = category.isActive ? 'active' : 'disabled';

    const handleClick = () => {
        cambiarEstado(category.category_id);
    }
   

    return (
        <div id='category' className='flex flex-col items-center h-40 my-8 snap-start shrink-0' >
            <h3 className='text-center capitalize font-medium'>{category.categoryName}</h3>
            <picture className={classActive} onClick={handleClick}>
                <img className='rounded-full w-20 h-20 md:w-24 md:h-24 border-2 border-gray-400 hover:border-white hover:cursor-pointer' src={category.imageUrl} />
            </picture>
            {
                // si el usuario esta activo se muestra el icono de eliminar.
                category.isActive? <Delete category= {category} deleteCategory={ deleteCategory }/>: <p className='h-7'></p>
            }
        </div>
    )
}

export default Category;