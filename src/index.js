import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'development') {
  const port = 4000;
  const url = `http://localhost:${port}`;
  fetch(url); // This line is optional, but it will ensure that the server starts on the specified port.
}
