// src/web-vitals.js
import { getCLS, getFID, getLCP, getFCP, getTTFB, getINP } from 'web-vitals';

const measureWebVitals = () => {
  getCLS(console.log);
  getFID(console.log);
  getLCP(console.log);
  getFCP(console.log);
  getTTFB(console.log);
  getINP(console.log);
};

export default measureWebVitals;