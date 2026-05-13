// helpers/utils.js
// Utility functions ที่ใช้ร่วมกันได้ทุก scenario

import { API_KEY } from "../config/env.js";

// สร้าง header มาตรฐานสำหรับ authenticated requests
export function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
}

// Log summary ของ response สำหรับ debug
export function logResponse(tag, res) {
  console.log(`[${tag}] status=${res.status} | duration=${res.timings.duration.toFixed(0)}ms`);
}