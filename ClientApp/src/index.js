import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DemoApp from './DemoApp';
import registerServiceWorker from './registerServiceWorker';
import './main.css'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <DemoApp/>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

