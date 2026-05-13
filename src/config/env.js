// config/env.js
// ดึงค่าจาก environment variable ที่ส่งมาตอน k6 run -e API_KEY=xxxx
export const BASE_URL = "https://api.restful-api.dev";
export const COLLECTION_NAME = "products";
export const API_KEY = __ENV.API_KEY;