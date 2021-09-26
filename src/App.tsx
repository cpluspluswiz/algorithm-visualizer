import React, { useState } from 'react';
import './App.css';


function App() {
  const [elements, setElements] = useState([20, 23, 45, 65, 23, 32, 50, 200, 23.4, 54, 23, 111, 42, 18]);
  const [sliderValue, setSliderValue] = useState(14);

  const selectedAlgorithm = "Buble Sort";

  const arrayGenerator = (size: number): void => {
    let newArray:number[] = [];
    for(let i = 0; i < size; i++){
      let element = Math.round(Math.random() * 300);
      newArray.push(element);
    }
    setElements(newArray);
  };
  const sizeSliderOnChange = () => {
    let arraySize = parseInt((document?.getElementById("size-slider") as HTMLInputElement)?.value);
    setSliderValue(arraySize);
    arrayGenerator(arraySize);
  }

  const generateNewArrayOnClick = () => {
    arrayGenerator(sliderValue)
  }

  const algorithmOnClick = () => {

  }

  return (
    <div className="app">
      <div className="header">
        <input id="generate-array-btn" className="btn" type="button" value="Generate a New Array" onClick={generateNewArrayOnClick}/>
        <div className="algorithms-container">
          <p>Choose an algorithm</p>
          <div className="algorithms-list">
            <input className="btn algorithm-btn" type="button" value="Buble sort" onClick={algorithmOnClick}/>
            <input className="btn algorithm-btn" type="button" value="Quick Sort" onClick={algorithmOnClick}/>
            <input className="btn algorithm-btn" type="button" value="Merge Sort" onClick={algorithmOnClick}/>
            <input className="btn algorithm-btn" type="button" value="Heap Sort" onClick={algorithmOnClick}/>
          </div>
        </div>
        <div className="algorithms-params">
          <p>Set Speed</p>
          <input className="slider" type="range" min="1" max="150" value="20" />
          <p>Set Size</p>
          <input id="size-slider" className="slider" type="range" min="1" max="150" value={sliderValue} onChange={sizeSliderOnChange}/>
        </div>
      </div>
      <div className="elements-wrapper">
        {elements.map((element, index) => <div key={index} className="array-element" style={{height: element * 2}}></div>)}
      </div>
    </div>
  );
}

export default App;
