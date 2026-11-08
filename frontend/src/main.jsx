import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.jsx'
import { resolveApiRequestUrl } from './services/urlResolver'
import { mockRequest } from './data/mockData'

axios.interceptors.request.use((config) => {
  if (typeof config.url === 'string') {
    config.url = resolveApiRequestUrl(config.url);
  }

  return config;
});

axios.defaults.adapter = async (config) => {
  const data = typeof config.data === 'string' ? JSON.parse(config.data || '{}') : (config.data || {});
  const responseData = await mockRequest(config.method || 'get', config.url || '/', data);
  return {
    data: config.responseType === 'blob' ? new Blob([JSON.stringify(responseData)], { type: 'application/json' }) : responseData,
    status: 200,
    statusText: 'OK',
    headers: { 'content-type': 'application/json' },
    config,
    request: {}
  };
};

const originalFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const requestUrl = typeof input === 'string' ? input : input.url;
  const normalizedUrl = resolveApiRequestUrl(requestUrl);

  if (normalizedUrl.includes('/api/')) {
    const method = init?.method || (typeof input === 'object' ? input.method : 'GET');
    const requestBody = init?.body || (typeof input === 'object' ? await input.clone().text() : '{}');
    const body = typeof requestBody === 'string' ? JSON.parse(requestBody || '{}') : {};
    const data = await mockRequest(method, normalizedUrl, body);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return originalFetch(normalizedUrl, init);
};

createRoot(document.getElementById('root')).render(
 <StrictMode>
   <App />
 </StrictMode>,
)
