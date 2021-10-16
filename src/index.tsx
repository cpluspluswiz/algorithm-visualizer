import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ElementContextProvider } from "./contexts/store"

ReactDOM.render(
  <ElementContextProvider>
    <App />
  </ElementContextProvider>,
  document.getElementById('root')
);
