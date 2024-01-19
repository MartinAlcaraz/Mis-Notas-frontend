import { useState } from "react";
import URI from "../services/URI";

function useFetch() {
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    async function sendHttpRequest(url, method, body, action) {

        try {
            setLoading(true);
            const response = await fetch(URI + url, {
                credentials: 'include',
                mode: 'cors',
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: body? body : null, 
                body: body ? JSON.stringify(body) : null
            });
            const data = await response.json();
            action(response, data);
            
        } catch (err) {
            // if problems with server in backend.
            console.log("Error \n ",err);
            setErrorMessage(err);
        } finally {
            setLoading(false);
        }
    }

    return [errorMessage, loading, sendHttpRequest];
}

export default useFetch;