import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import './index.css'
import { reportWebVitals } from './reportWebVitals'

const root = createRoot(document.getElementById("root")!);

root.render(
  <>
    <App />
    <Analytics />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals(console.log);
