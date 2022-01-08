import React, {createContext, useState} from "react";

type ElementContextType = {
    elements: number[],
    setElements: React.Dispatch<React.SetStateAction<number[]>>,
    arraySize: number,
    setArraySize: React.Dispatch<React.SetStateAction<number>>,
    speed: number,
    setSpeed: React.Dispatch<React.SetStateAction<number>>,
    started: boolean,
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
    delay: (ms: number) => Promise<any>
}

const ElementContext = createContext<ElementContextType>({} as ElementContextType);

export const ElementContextProvider = (props:any) => {
    const [elements, setElements] = useState([20, 23, 15, 65, 23, 32, 50, 200, 23.4, 54, 23, 111, 42, 18]);
    const [arraySize, setArraySize] = useState(14);
    const [speed, setSpeed] = useState(200);
    const [started, setStarted] = useState(false);
    const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

    return (
        <ElementContext.Provider value={{elements: elements, setElements: setElements, arraySize: arraySize, setArraySize: setArraySize, speed: speed, setSpeed: setSpeed, started: started, setStarted: setStarted, delay: delay}}>
            {props.children}
        </ElementContext.Provider>
    )
}

export default ElementContext;