import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; // ตรวจสอบว่าคุณอิมพอร์ต store ถูกต้อง
import App from './App';
import './index.css'; // เชื่อมไฟล์ CSS ของ Tailwind


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
