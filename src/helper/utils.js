// helpers/utils.js สร้าง header มาตรฐานสำหรับ authenticated requests
// Utility functions ที่ใช้ร่วมกันได้ทุก scenario


import { API_KEY } from "../config/env.js";

export function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };
}
export function logResponse(tag, res) {
  console.log(`[${tag}] status=${res.status} | duration=${res.timings.duration.toFixed(0)}ms`);
}