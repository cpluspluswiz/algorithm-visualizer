import React, { useState } from 'react';
import './App.css';


function App() {
  const [elements, setElements] = useState([20, 23, 45, 65, 23, 32, 50, 200, 23.4, 54, 23, 111, 42, 18]);
  const [arraySize, setArraySize] = useState(14);
  const [sortingSpeed, setSortingSpeed] = useState(200);
  const [started, setStarted] = useState(false);
  const [stop, setStop] = useState(false);

  const selectedAlgorithm = "Buble Sort";

  const arrayGenerator = (size: number): void => {
    let newArray:number[] = [];
    for(let i = 0; i < size; i++){
      let element = Math.round(Math.random() * 300);
      newArray.push(element);
    }
    setElements(newArray);
  };
  const arraySizeSliderOnChange = () => {
    let arraySize = parseInt((document?.getElementById("size-slider") as HTMLInputElement)?.value);
    setArraySize(arraySize);
    arrayGenerator(arraySize);
  }

  const arraySpeedSliderOnChange = () => {
    let arraySpeed = parseInt((document?.getElementById("speed-slider") as HTMLInputElement)?.value);
    setSortingSpeed(arraySpeed);
  }

  const generateNewArrayOnClick = () => {
    arrayGenerator(arraySize);
  }
  const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
  const swapArrayEl = (arr:number[], idx:number) => {
    let temp = arr[idx + 1];
    arr[idx + 1] = arr[idx];
    arr[idx] = temp;
  }

  /* ALGORITHMS */

  const bubbleSort = async (speed:number) => {
    setStarted(true);
    let isSorted = false;
    let newArray = elements;
    while(!isSorted){
      if(stop){
        console.log(stop);
        setStarted(false);
        return;
      };
      console.log(stop);
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
            arr1.style.background = "#A61B1B";
            arr2.style.background = "#A61B1B";
            isSorted = false;
        }else{
          arr1.style.background = "#A61B1B";
          arr2.style.background = "#A61B1B";
        }
      }
    }
    setStarted(false);
  }

  return (
    <div className="app">
      <div className="header">
        <input id="generate-array-btn" className={`btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Generate a New Array" onClick={generateNewArrayOnClick}/>
        {/* <button className="btn" onClick={() => {
          setStop(true);
        }}>Stop</button> */}
        <div className="algorithms-container">
          <p>Choose an algorithm</p>
          <div className="algorithms-list">
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Buble sort" onClick={() => bubbleSort(sortingSpeed)}/>
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Quick Sort" />
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Merge Sort" />
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Heap Sort" />
          </div>
        </div>
        <div className="algorithms-params">
          <p>Set Speed</p>
          <input id="speed-slider" className={`slider ${started ? "slider-disabled" : ""}`} disabled={started} type="range" min="10" max="400" value={sortingSpeed} onChange={arraySpeedSliderOnChange}/>
          <p>Set Size</p>
          <input id="size-slider" className={`slider ${started ? "slider-disabled" : ""}`} disabled={started} type="range" min="1" max="150" value={arraySize} onChange={arraySizeSliderOnChange}/>
        </div>
      </div>
      <div className="elements-wrapper">
        {elements.map((element, index) => <div key={index} className="array-element" style={{height: element * 2}}></div>)}
      </div>
    </div>
  );
}

export default App;
