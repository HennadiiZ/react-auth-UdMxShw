import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import { AuthContextProviders } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProviders>
);
