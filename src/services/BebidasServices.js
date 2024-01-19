import URI from "./URI";

const bebidasServices = {};

bebidasServices.getBebidas = async ()=>{

    try {
        const response = await fetch(URI+'/api/products/category/bebidas', {
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

export default bebidasServices;