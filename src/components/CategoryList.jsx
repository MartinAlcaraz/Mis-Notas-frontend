import Category from './Category';

const CategoryList = ({ categories = [], cambiarEstado, deleteCategory }) => {

    if (categories.length == 0) {
        return <p className='text-white text-center h-[85%]'>No existen categorias.</p>
    }

    const onclickCategory = (e) => {
        console.log(e.target.id == 'categoryList' || e.target.id == 'category')
    }

    return (
        <div id='categoryList' onClick={onclickCategory} className='snap-y flex-col h-full overflow-scroll scrollbar-hide' >
            {
                categories.map(c => {
                    return <Category key={c._id} category={c} cambiarEstado={cambiarEstado} deleteCategory={deleteCategory} />
                })
            }
        </div>
    )
}

export default CategoryList;