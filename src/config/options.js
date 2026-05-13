// config/options.js
//
// === ASSUMPTION ===
// สมมติว่า API นี้เป็น product catalog ของ e-commerce
// โดยมี traffic pattern แบบ gradual ramp-up เหมือน production จริง
//
// Scenario: 3 stages
// 1. Ramp-up   : ค่อยๆ เพิ่ม user จาก 0 → 20 ใน 30 วิ (simulate เช้าเปิดร้าน)
// 2. Sustained : คง 20 VU ไว้ 1 นาที (simulate peak hour)
// 3. Ramp-down : ลด user ลงกลับ 0 ใน 20 วิ (simulate ปิดวัน)
//
// Thresholds (SLA ที่ยอมรับได้):
// - http_req_duration p(95) < 2000ms  → 95% ของ request ต้องเร็วกว่า 2 วิ
// - http_req_failed < 1%              → error rate ห้ามเกิน 1%

export const options = {
  stages: [
    { duration: "20s", target: 2 },
    { duration: "30s", target: 2 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  },
};