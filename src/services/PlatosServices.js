import URI from "./URI";

const platosServices = {};

platosServices.getPlatos = async ()=>{

    try {
        const response = await fetch(URI+'/api/products/category/plato', {
            method: 'GET',
            credentials: 'omit',
            // headers: {
            //     'Content-Type': 'application/json'            
            // },
        });
        const data = await response.json();

        if(response.status >= 500){ 
            // error in connexion
            throw new Error("Something went wrong."); 
        }
        return data;
    } catch (err) {
        return {status: "FAILED", message: err.message};
    }
}

export default platosServices;