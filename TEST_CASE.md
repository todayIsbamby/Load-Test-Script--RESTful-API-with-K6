# Load Test Test Case
#### **Test Case: **Load Test for Product Creation API

**API Under Test**
- POST https://api.restful-api.dev/collections/products/objects

**Objective**

- Verify that Product Creation API can handle concurrent requests under moderate load while maintaining acceptable response time and low error rate.

**Assumption**

- This API is assumed to be used as a product catalog service for an e-commerce platform.

**Expected user behavior:**

- Users create products occasionally, not continuously at very high volume
- API has request limit of 100 requests (API limitation)
- Moderate traffic pattern is simulated to avoid exceeding rate limit

**Traffic simulation:**

- 20 virtual users (VUs)
- Gradual ramp-up and ramp-down
- Think time between requests to simulate real users filling forms