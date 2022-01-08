import { useContext } from "react";
import ElementContext from "../contexts/store"

const useQuickSort = () => {
    const {elements, setElements, setStarted, delay, speed } = useContext(ElementContext);
    let elementsClone = [...elements];
    const width = document.querySelectorAll('.array-element')[0]?.getBoundingClientRect().width + 3;
    const app = document.querySelector<HTMLElement>('.app') as HTMLElement;


    const swap = (indx1:number, indx2:number) => {
        let temp = elementsClone[indx1];
        elementsClone[indx1] = elementsClone[indx2];
        elementsClone[indx2] = temp;
    }

    const partition = async (low: number, high: number, pivot:number):Promise<number> => {
        let l = low;
        let r = high - 1; 
        document.querySelectorAll<HTMLElement>('.array-element')[high].style.background = "orange"; //highlight pivot
        let arr1 = document.querySelectorAll<HTMLElement>('.array-element')[l];
        arr1.style.background = "green";
        let arr2 = document.querySelectorAll<HTMLElement>('.array-element')[r];
        arr2.style.background = "green";
        await delay(speed);
        while(true) {
            while((elementsClone[l] <= pivot) && (l < high)) {
                arr1.style.background = "linear-gradient( #A61B1B, #F26B83)";
                l++;
                arr1 = document.querySelectorAll<HTMLElement>('.array-element')[l];
                arr1.style.background = "green";
                await delay(speed);
            }
            while((elementsClone[r] >= pivot) && (r > low)) {
                arr2.style.background = "linear-gradient( #A61B1B, #F26B83)";
                r--;
                arr2 = document.querySelectorAll<HTMLElement>('.array-element')[r];
                arr2.style.background = "green";
                await delay(speed);
            }
            if(l >= r) {
                arr1.style.background = "linear-gradient( #A61B1B, #F26B83)";
                arr2.style.background = "linear-gradient( #A61B1B, #F26B83)";
                document.querySelectorAll<HTMLElement>('.array-element')[high].style.background = "linear-gradient( #A61B1B, #F26B83)";
                break;
            } else {
                arr1.style.background = "black";
                arr2.style.background = "grey";
                await delay(speed);
                app.style.setProperty('--slideLeft', `-${width*(r - l)}px`);
                app.style.setProperty('--slideRight', `${width*(r - l)}px`);
                arr1.classList.add("slide-right");
                arr2.classList.add("slide-left");
                await delay(speed);
                swap(l, r);
                setElements([...elementsClone]);
                arr1.style.background = "linear-gradient( #A61B1B, #F26B83)";
                arr2.style.background = "linear-gradient( #A61B1B, #F26B83)";
                arr1.classList.remove("slide-right");
                arr2.classList.remove("slide-left");
            }
        }
        document.querySelectorAll<HTMLElement>('.array-element')[high].style.background = "linear-gradient( #A61B1B, #F26B83)";
        arr2 = document.querySelectorAll<HTMLElement>('.array-element')[high];
        app.style.setProperty('--slideLeft', `-${width*(high - l)}px`);
        app.style.setProperty('--slideRight', `${width*(high - l)}px`);
        arr1.classList.add("slide-right");
        arr2.classList.add("slide-left");
        await delay(speed);
        swap(l, high);
        setElements([...elementsClone]);
        arr1.classList.remove("slide-right");
        arr2.classList.remove("slide-left");
        return l;
    }
    const executeQuickSort = async (left: number, right: number) => {
        if(right - left <= 0) {
            return
        }
        else{
            let pivot = elementsClone[right]
            let pi = await partition(left, right, pivot);
            await executeQuickSort(left, pi - 1);
            await executeQuickSort(pi + 1, right);
        }
    }

    const quickSort = async () => {
        setStarted(true);
        console.log("Before", elementsClone);
        await executeQuickSort(0, elementsClone.length - 1);
        console.log("After", elementsClone);
        setStarted(false);
    }

    return [quickSort];
}

export default useQuickSort;