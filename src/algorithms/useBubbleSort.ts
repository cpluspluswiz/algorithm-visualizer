import {useContext} from "react";
import ElementContext from "../contexts/store"

const swapArrayEl = (arr:number[], idx:number) => {
  let temp = arr[idx + 1];
  arr[idx + 1] = arr[idx];
  arr[idx] = temp;
}

const useBubbleSort = () => {
  const {elements, setElements, setStarted, delay} = useContext(ElementContext);

  const bubbleSort = async (): Promise<void> => {
    setStarted(true);
    let isSorted = false;
    let newArray = elements;
    while(!isSorted){
      isSorted = true;
      for(let i = 0; i < newArray.length - 1; ++i) {
        const arr1 = document.querySelectorAll<HTMLElement>('.array-element')[i];
        const arr2 = document.querySelectorAll<HTMLElement>('.array-element')[i + 1];
        arr1.style.background = "green";
        arr2.style.background = "green";
        await delay(200);
        if(newArray[i] > newArray[i + 1]){
            swapArrayEl(newArray, i);
            arr1.style.background = "black";
            arr2.style.background = "grey";
            await delay(200);
            arr1.classList.add("slide-right")
            arr2.classList.add("slide-left")
            await delay(200);
            setElements([...newArray]);
            arr1.style.background = "grey";
            arr2.style.background = "black";
            arr1.classList.remove("slide-right")
            arr2.classList.remove("slide-left")
            arr1.style.backgroundImage = "linear-gradient( #A61B1B, #F26B83)";
            arr2.style.backgroundImage = "linear-gradient( #A61B1B, #F26B83)";
            isSorted = false;
        }else{
          arr1.style.backgroundImage = "linear-gradient( #A61B1B, #F26B83)";
          arr2.style.backgroundImage = "linear-gradient( #A61B1B, #F26B83)";
        }
      }
    }
    setStarted(false);
  }

  return [bubbleSort];
}

export default useBubbleSort;