import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <footer>Created by <a href="https://typicel.me">typicel</a> | <a href="https://github.com/typicel/sticky-board">View on Github</a></footer>
  </React.StrictMode>
);
