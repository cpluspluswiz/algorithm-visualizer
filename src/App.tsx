import React, { useState, useContext } from 'react';
import './App.css';
import useBubbleSort from './algorithms/useBubbleSort';
import useMergeSort from './algorithms/useMergeSort';
import ElementContext from "./contexts/store"


function App() {
  const {elements, setElements, started, arraySize, setArraySize} = useContext(ElementContext);
  const [sortingSpeed, setSortingSpeed] = useState(200);
  const [bubbleSort] = useBubbleSort();
  const [mergeSort] = useMergeSort();

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

  return (
    <div className="app">
      <div className="header">
        <input id="generate-array-btn" className={`btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Generate a New Array" onClick={generateNewArrayOnClick}/>
        <div className="algorithms-container">
          <p>Choose an algorithm</p>
          <div className="algorithms-list">
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Buble sort" onClick={() => bubbleSort()}/>
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Quick Sort" onClick={() => mergeSort()}/>
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Merge Sort" />
            <input className={`btn algorithm-btn ${started ? "btn-disabled" : ""}`} disabled={started} type="button" value="Heap Sort" />
          </div>
        </div>
        <div className="algorithms-params">
          <p>Set Speed</p>
          <input id="speed-slider" className={`slider ${started ? "slider-disabled" : ""}`} disabled={started} type="range" min="10" max="400" value={sortingSpeed} onChange={arraySpeedSliderOnChange}/>
          <p>Set Size</p>
          <input id="size-slider" className={`slider ${started ? "slider-disabled" : ""}`} disabled={started} type="range" min="2" max="150" value={arraySize} onChange={arraySizeSliderOnChange}/>
        </div>
      </div>
      <div className="elements-wrapper">
        {elements.map((element, index) => <div key={index} className="array-element" style={{height: element * 2}}></div>)}
      </div>
    </div>
  );
}

export default App;
