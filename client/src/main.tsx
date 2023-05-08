import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../i18n.js';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
