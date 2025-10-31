import React from 'react';
import { AxiosError } from 'axios';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

if (process.env.VITE_SENTRY_DSN) {
  const serverErrorRegex = new RegExp(
    ``,
  )
  Sentry.init({
    dsn: process.env.VITE_SENTRY_DSN,
    release: process.env.VITE_VERSION,
    environment: process.env.VITE_SENTRY_ENV,
    beforeSend(event, hint) {
      const error = hint?.originalException as AxiosError;

      // ignore handled API errors (>=400) to avoid unnecessary noise in Sentry
      if (
        error.isAxiosError &&
        error?.response?.status &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return null;
      }
      return event;
    },
  });
}

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
