# Load Test Script Assignment - K6

## Project Overview
This project performs load testing on the Product Creation API from:

https://restful-api.dev/

Selected API:
POST /collections/products/objects

Tool used:
- K6

---

## Test Objective
Verify API performance under moderate concurrent load.

Test focuses on:
- Response time
- Error rate
- API stability under concurrent POST requests

---

## Assumptions
This API is assumed to be used by an e-commerce platform for product creation.

Constraints:
- Public API has rate limit: 100 requests

To avoid rate limiting:
- 2 Virtual Users
- Gradual ramp-up
- Think time between requests

---

## Load Configuration

Stages:
- Ramp-up: 20s to 2 users
- Stable load: 30s with 2 users
- Ramp-down: 10s to 0 users

Thresholds:
- p(95) response time < 2000ms
- error rate < 5%

---

## Project Structure

src/
├── config/
│   ├── env.js
│   └── options.js
├── data/
│   └── testdata.json
├── helper/
│   └── utils.js
├── scenarios/
│   └── postProducts.js
└── main.js

---

## How to Run

Install K6:

```bash
choco install k6
```

Run script:

```bash
k6 run -e API_KEY=your_api_key src/main.js
```

---

## Validation Checks
The script validates:

- HTTP status = 200
- response contains id
- response contains createdAt
- response name matches request payload

---

## Expected Result
Successful test should show:

- low error rate
- response time under threshold
- stable API behavior under moderate load