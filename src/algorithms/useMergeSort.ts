import { useContext, useEffect } from "react";
import ElementContext from "../contexts/store"

const useMergeSort = () => {
    const {elements, setElements, setStarted, delay} = useContext(ElementContext);
    let elementsClone = [...elements];

    const merge = async (left: number, middle:number, right: number) => {
        let seg1 = middle - left + 1;
        let seg2 = right - (middle + 1) + 1;
        let k1 = left;
        let k2 = middle + 1;
        let result = [];
        
        while((k1 - left) < seg1 && (k2 - (middle + 1)) < seg2) {
            if(elementsClone[k1] > elementsClone[k2]) {
                result.push(elementsClone[k2]);
                k2++;
            }
            else {
                result.push(elementsClone[k1]);
                k1++;
            }
        }

        while((k1 - left) < seg1) {
            result.push(elementsClone[k1]);
            k1++
        }
        while((k2 - (middle + 1)) < seg2) {
            result.push(elementsClone[k2]);
            k2++
        }

        //replace the unsorted segment in the elemnts array with the sorted segment from the result array
        for(let i = 0; i < result.length; i ++) {
            elementsClone.splice(left + i, 1, result[i]);
        }
        setElements([...elementsClone]);
    }

    const executeMergeSort = async (left: number, right: number) => {
        let middle = Math.floor((left + right) / 2);
        
        if(left !== right) {
            await executeMergeSort(left, middle);
            await executeMergeSort(middle + 1, right);
            await merge(left, middle, right);
            
        }
    }

    const mergeSort = async () => {
        setStarted(true);
        console.log("begining of merge sort", elements);
        executeMergeSort(0, elements.length - 1);
        console.log("end of merge sort", elements);
        setStarted(false);
    }

    return [mergeSort];
}

export default useMergeSort;