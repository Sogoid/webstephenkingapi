import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
// import App from './App.tsx'
import App from './routes/App';
import './index.css'
import './App.css'
import './assets/styles/fonts.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
