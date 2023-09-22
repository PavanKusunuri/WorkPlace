import { createRoot } from 'react-dom/client';
import App from './App';
import './app.css';

const app =  document.getElementById('root');

// Create a root
const root = createRoot(app);

// render app to root
root.render(<App/>)
