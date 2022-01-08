import { useContext } from "react";
import ElementContext from "../contexts/store"

const useQuickSort = () => {
    const {elements, setElements, setStarted, delay} = useContext(ElementContext);
    let elementsClone = [...elements];

    const heapify = async (n:number, i:number) => {
        let parent = i;
        let left = (2 * i) + 1;
        let right = (2 * i) + 2;
        let p = document.querySelectorAll<HTMLElement>('.array-element')[parent]; p.style.background = "orange";
        
        if(left < n && elementsClone[left] > elementsClone[parent]) {
            document.querySelectorAll<HTMLElement>('.array-element')[left].style.background = "green";
            parent = left;
        }
        if(right < n && elementsClone[right] > elementsClone[parent]) {
            document.querySelectorAll<HTMLElement>('.array-element')[right].style.background = "green";
            parent = right;
        }
        await delay(2000);
        if(parent !== i) {
            let temp = elementsClone[parent];
            elementsClone[parent] = elementsClone[i];
            elementsClone[i] = temp;
            document.querySelectorAll<HTMLElement>('.array-element')[parent].style.background = "grey";
            p.style.background = "black";
            await delay(200);
            setElements([...elementsClone]);
            document.querySelectorAll<HTMLElement>('.array-element')[parent].style.background = "black";
            p.style.background = "grey";
            await delay(200);
            p.style.background = "linear-gradient( #A61B1B, #F26B83)";
            if(left< n)
                document.querySelectorAll<HTMLElement>('.array-element')[left].style.background = "linear-gradient( #A61B1B, #F26B83)";
            if(right < n)
                document.querySelectorAll<HTMLElement>('.array-element')[right].style.background = "linear-gradient( #A61B1B, #F26B83)";
            await heapify(n, parent);
        }
        if(left< n)
            document.querySelectorAll<HTMLElement>('.array-element')[left]!.style.background = "linear-gradient( #A61B1B, #F26B83)";
        if(right < n)
            document.querySelectorAll<HTMLElement>('.array-element')[right].style.background = "linear-gradient( #A61B1B, #F26B83)";
    }

    const executeHeapSort = async () => {
        let n = elementsClone.length;

        for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            let temp = elementsClone[0];
            elementsClone[0] = elementsClone[i];
            elementsClone[i] = temp;
            setElements([...elementsClone]);
            await delay(200);
            await heapify(i, 0);
        }
    }

    const heapSort = async () => {
        console.log("Before", elementsClone);
        await executeHeapSort();
        console.log("After", elementsClone);
    }

    return [heapSort];
}

export default useQuickSort;