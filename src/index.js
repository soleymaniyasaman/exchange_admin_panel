import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

import MyProvider from './context/provider';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import { faIR } from '@material-ui/core/locale';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const theme = createMuiTheme({

  direction: "rtl",

  typography: {

    fontFamily: " IranSans,  \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",

  },

  palette: {

    type: 'dark',

    primary: {

      main: "#10D078",

      contrastText: "white"

    },

    secondary: {

      main: "#558EFA"

    }

  },

}, faIR);



ReactDOM.render(

  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <MyProvider>

        <App />

      </MyProvider>

    </ThemeProvider>

  </React.StrictMode>,

  document.getElementById('root')

);



// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

serviceWorkerRegistration.unregister();

reportWebVitals();

