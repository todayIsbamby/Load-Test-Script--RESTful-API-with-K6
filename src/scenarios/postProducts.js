// === TEST CASE: POST /collections/products/objects ===
//
// Objective:
//   ทดสอบว่า endpoint รับ concurrent write requests ได้ตาม SLA
//   ภายใต้สภาวะ 20 VUs ยิง POST พร้อมกัน
//
// Test Steps:
//   1. สุ่มเลือก product จาก testdata.json ทุก iteration (realistic payload variety)
//   2. ส่ง POST request พร้อม x-api-key header + JSON body
//   3. Assert HTTP status = 200 (OK)
//   4. Assert response body มี field "id" (server assign ให้)
//   5. Assert "name" ใน response ตรงกับที่ส่งไป
//
// Assumption:
//   - ใช้ข้อมูลหลากหลายจาก testdata.json เพื่อ simulate user จริงที่ส่ง product ต่างกัน
//   - think time 1-2 วิ simulate เวลา user กรอก form ก่อน submit ครั้งถัดไป
//   - แต่ละ VU จะ loop ต่อเนื่องตลอด duration โดยสุ่ม product ใหม่ทุกรอบ

import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { BASE_URL, COLLECTION_NAME } from "../config/env.js";
import { getHeaders, logResponse } from "../helper/utils.js";


const testData = JSON.parse(open("../data/testdata.json"));// โหลด test data ครั้งเดียวตอน init (ก่อน VU เริ่ม) 

export const postProductsDuration = new Trend("post_products_duration", true);// Custom metric สำหรับ track duration ของ endpoint นี้โดยเฉพาะ

export function postProductsScenario() {
  const url = `${BASE_URL}/collections/${COLLECTION_NAME}/objects`;
  const randomIndex = Math.floor(Math.random() * testData.length); // สุ่มเลือก product จาก testdata.json ทุก iteration
  const payload = JSON.stringify(testData[randomIndex]);
  const res = http.post(url, payload, { headers: getHeaders() });
  postProductsDuration.add(res.timings.duration);// เก็บ duration ลง custom metric
 
  logResponse("POST /collections/products/objects", res);

  // === Assertions ===
  check(res, {
    "status is 200": (r) => r.status === 200,
    "response has id": (r) => r.json("id") !== undefined,
    "name matches payload": (r) => r.json("name") === testData[randomIndex].name,
  });

  sleep(Math.random() * 1 + 1);// Think time: 1-2 วิ simulate เวลา user กรอก form ก่อน submit ครั้งถัดไป
}