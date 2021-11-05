import { useContext, } from "react";
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

        // For highliting purposes
        let arr = [];
        for (let i = k1; i < k1 + (seg1 + seg2); i++) {
            arr.push(document.querySelectorAll<HTMLElement>('.array-element')[i]);
            arr[i - k1].style.background = "cyan";
            arr[i - k1].classList.add("slide-bottom");
        }
        await delay(200);
        let w = 0;

        while((k1 - left) < seg1 && (k2 - (middle + 1)) < seg2) {
            const arr1 = document.querySelectorAll<HTMLElement>('.array-element')[k1];
            const arr2 = document.querySelectorAll<HTMLElement>('.array-element')[k2];
            arr1.style.background = "green";
            arr2.style.background = "green";
            await delay(200);
            if(elementsClone[k1] > elementsClone[k2]) {
                arr1.style.background = "black";
                arr2.style.background = "grey";
                await delay(200);
                // container.style.setProperty('--translateX', `${-18*((k2 - left) - w)}px`);
                // container.style.setProperty('--translateY', `${0}px`);
                arr2.classList.remove("slide-bottom");
                arr2.animate([
                    {transform: "translate(0px, 200px)"},
                    { transform: `translate(${-18*((k2 - left) - w)}px, 0px)` }
                ], {
                    duration: 200,
                    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
                });
                arr2.style.transform = `translate(${-18*((k2 - left) - w)}px, 0px)`;
                //arr2.style.animationDuration = '200';
                await delay(200);
                result.push(elementsClone[k2]);
                arr1.style.background = "grey";
                arr2.style.background = "black";
                k2++;
                w++;
            }
            else {
                arr2.classList.remove("slide-in");
                // container.style.setProperty('--translateY', `${0}px`);
                // container.style.setProperty('--translateX', `${-18*((k1 - left) - w)}px`);
                arr1.classList.remove("slide-bottom");
                //arr1.classList.add("slide-in");
                arr1.style.transform = `translate(${-18*((k1 - left) - w)}px, 0px)`;
                arr1.style.animationDuration = '200';
                arr1.animate([
                    {transform: "translate(0px, 200px)"},
                    { transform: `translate(${-18*((k1 - left) - w)}px, 0px)` }
                ], {
                    duration: 200,
                    easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
                });
                await delay(200);
                result.push(elementsClone[k1]);
                k1++;
                w++
            }
            arr1.style.background = "cyan";
            arr2.style.background = "cyan";
        }
        
        

        for (let i = 0; i < (seg1 + seg2); i++) {
            arr[i].style.background = "linear-gradient( #A61B1B, #F26B83)";
            
        }

        while((k1 - left) < seg1) {
            const arr1 = document.querySelectorAll<HTMLElement>('.array-element')[k1];
            //arr1.classList.remove("slide-in");
            //container.style.setProperty('--translateX', `${-18*((k1 - left) - w)}px`);
            arr1.classList.remove("slide-bottom");
            //arr1.classList.add("slide-in");
            arr1.style.transform = `translate(${-18*((k1 - left) - w)}px, 0px)`;
            arr1.style.animationDuration = '200';
            arr1.animate([
                {transform: "translate(0px, 200px)"},
                { transform: `translate(${-18*((k1 - left) - w)}px, 0px)` }
            ], {
                duration: 200,
                easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
            });
            await delay(200);
            result.push(elementsClone[k1]);
            k1++
            w++;
        }
        while((k2 - (middle + 1)) < seg2) {
            const arr2 = document.querySelectorAll<HTMLElement>('.array-element')[k2];
            //arr2.classList.remove("slide-in");
            //container.style.setProperty('--translateX', `${-18*((k2 - left) - w)}px`);
            //container.style.setProperty('--translateY', `${0}px`);
            arr2.classList.remove("slide-bottom");
            //arr2.classList.add("slide-in");
            arr2.animate([
                { transform: "translate(0px, 200px)" },
                { transform: `translate(${-18*((k2 - left) - w)}px, 0px)` }
            ], {
                duration: 200,
                easing: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
            });
            arr2.style.transform = `translate(${-18*((k2 - left) - w)}px, 0px)`;
            //arr2.style.animationDuration = '200';
            await delay(200);
            result.push(elementsClone[k2]);
            k2++;
            w++;
        }
        await delay(200);
        //replace the unsorted segment in the elemnts array with the sorted segment from the result array
        for(let i = 0; i < result.length; i ++) {
            elementsClone.splice(left + i, 1, result[i]);
        }
        await delay(2000);
        setElements([...elementsClone]);

        for (let i = k1; i < k1 + (seg1 + seg2); i++) {
            arr[i - k1].style.removeProperty("transform");
            arr[i - k1].style.removeProperty("animationDuration");
            console.log(arr[i - k1]);
        }
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