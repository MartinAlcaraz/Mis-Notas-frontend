import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import useFetch from '../Utils/useFetch.js';
import Product from '../components/Product.jsx';
import ErrorPage from './ErrorPage.jsx';
import Layuot from '../components/Layout.jsx';

const Search = () => {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const { state } = useLocation();
    const { searchProduct } = state;     // contiene el texto ingresado en el input de busqueda del navbar
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const queryHandler = (res, data) => {

        if (res.status == "FAILED") {
            navigate('/error');
        } else {
            if (data.length == 0) {
                setProducts([]);
            } else {
                setProducts(data.data.products);
            }
        }
    }

    // 1° se consultan los productos
    useEffect(() => {
        sendHttpRequest(`/api/products/search?name=${searchProduct}`, 'GET', null, queryHandler);
    }, [searchProduct]);

    if (errorMessage) {
        return <ErrorPage />
    }

    return (
        <Layuot>
            <p>Resultados para: <strong className='text-xl'>{searchProduct}</strong></p>
            {
                loading ? <Loading /> :

                    products.length == 0 ? <p>No hay resultados.</p> :
                        products.map((p, index) => {
                            let img = new Image();
                            img.src = p.imgURL;
                            return img.onload = <Product key={index} imgURL={p.imgURL} _id={p._id} name={p.name} price={p.price} description={p.description} category={p.category} />
                        })
            }
        </Layuot>
    )
}

export default Search;