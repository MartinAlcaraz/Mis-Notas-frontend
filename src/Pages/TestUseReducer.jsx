// useReducer() limita la forma de actualizar las variables de estado,
// Solo se pueden modificar las variables usando las funciones predefinidas.

import { useReducer } from 'react';

const reducer = (currentState, action) => {

    switch (action) {
        case 'increment':
            return { count: currentState.count + 1 };
        case 'decrement':
            return { count: currentState.count - 1 };
        default :
            return currentState;
    }
}

const TestUseReducer = () => {

    const [state, dispatcher] = useReducer(reducer, { count: 0 });

    const decrementHandler = () => {
        dispatcher('decrement');
    }

    const incrementHandler = () => {
        dispatcher('increment');
    }

    return (
        <div className='flex p-8 m-1 border-primary bg-primary bg-secondary md:bg-secondary-md md:m-2'>
            <button onClick={decrementHandler} className="p-2 my-2 mx-4 button-primary"> - </button>
            <span className="p-2 my-2 mx-4">{state.count}</span>
            <button onClick={incrementHandler} className="p-2 my-2 mx-4 button-primary"> + </button>
        </div>
    );
}

export default TestUseReducer;