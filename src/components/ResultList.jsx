import { useEffect, useState } from "react";

const ResultList = ({ categoryList, text, setInputValue }) => {

    const [found, setFound] = useState(false);

    // click en un item de la lista
    const onClick = (e) => {
        setInputValue(e.target.innerHTML);
    }

    useEffect(() => {
        if (text != "") {
            let founded = 0;
            categoryList.map((c) => {
                if (c.categoryName.toLowerCase().includes(text.toLowerCase())) {
                    founded++;
                }
            })

            if (founded > 0) {
                setFound(true);
            }
        }else{
            return <></>
        }
    }, [text]);

    return (
        <ul className="absolute mt-7 z-30 bg-blue-400/50 rounded-md" >
            {
                found ? (
                    categoryList.map((c, index) => {
                        if (c.categoryName.toLowerCase().includes(text.toLowerCase())) {
                            return <li onClick={onClick} className="hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer" key={index}>
                                {c.categoryName}
                            </li>
                        }
                    })) : <li className="bg-gray-100/70 px-2 py-1 rounded-md cursor-pointer">
                    No hay resultados...
                </li>
            }
        </ul>
    )
}

export default ResultList;