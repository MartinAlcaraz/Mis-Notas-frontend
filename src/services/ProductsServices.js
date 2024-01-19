import URI from "./URI";

const productsServices = {};

productsServices.postProduct = async (formData) => {
    try {
        const response = await fetch(URI+'/api/products/', {
            method: 'POST',
            credentials: 'include',
            hearders: "",
            body: formData
        });
        // const data = await response.json();
        return response;
    } 
    catch (err) {
        return ( {status: "FAILED", message: err.message} );
    }
}

export default productsServices;