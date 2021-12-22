import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './Views/App';
import {BrowserRouter as Router} from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        language="en"
        useRecaptchaNet={true}
        useEnterprise={false}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: 'head',
          nonce: undefined // optional, default undefined
        }}>
      <App />
    </GoogleReCaptchaProvider>
      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
