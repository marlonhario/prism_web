import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import GA4React from 'ga-4-react';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS || '');

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App />);

(async (_) => {
  await ga4react
    .initialize()
    .then((res) => console.log('Analytics Success.'))
    .catch((err) => console.log('Analytics Failure.'))
    .finally(() => {
      const container = document.getElementById('root');
      const root = createRoot(container!);
      root.render(<App />);
    });
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
