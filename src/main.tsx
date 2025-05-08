import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import '@/styles/leaflet.css';
import { reportWebVitals } from './reportWebVitals';

// Initialize Vercel Analytics
inject();

const root = createRoot(document.getElementById("root")!);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals(console.log);
