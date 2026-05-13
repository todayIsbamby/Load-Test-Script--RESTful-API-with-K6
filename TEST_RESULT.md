# First Exercute

> Setting: 
```javascript
export const options = {
  stages: [
    { duration: "20s", target: 50 },
    { duration: "30s", target: 50 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"],
    http_req_failed: ["rate<0.05"],
  },
};
```

> Result:
INFO[0000] [POST /collections/products/objects] status=200 | duration=176ms  source=console
.
.
.
.
WARN[0128] Request Failed                                error="Post \"https://api.restful-api.dev/collections/products/objects\": request timeout"
INFO[0128] [POST /collections/products/objects] status=0 | duration=59999ms  source=console
ERRO[0128] GoError: the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at response has id (file:///C:/Users/nsach/load_test_script_assignment/src/scenarios/postProducts.js:52:37(4))
        at go.k6.io/k6/v2/internal/js/modules/k6.(*K6).Check-fm (native)
        at postProductsScenario (file:///C:/Users/nsach/load_test_script_assignment/src/scenarios/postProducts.js:50:8(62))
        at default (file:///C:/Users/nsach/load_test_script_assignment/src/main.js:7:23(3))  executor=ramping-vus scenario=default source=stacktrace

  █ THRESHOLDS 

    http_req_duration
    ✓ 'p(95)<2000' p(95)=984.26ms

    http_req_failed
    ✗ 'rate<0.01' rate=89.60%

  █ TOTAL RESULTS 

    checks_total.......: 3846   29.998015/s
    checks_succeeded...: 5.20%  200 out of 3846
    checks_failed......: 94.79% 3646 out of 3846

    ✗ status is 201
      ↳  0% — ✓ 0 / ✗ 962
    ✗ response has id
      ↳  10% — ✓ 100 / ✗ 862
    ✗ response has createdAt
      ↳  0% — ✓ 0 / ✗ 961
    ✗ name matches payload
      ↳  10% — ✓ 100 / ✗ 861

    CUSTOM
    post_products_duration.........: avg=320.91ms min=97.39ms  med=107.35ms max=59.99s p(90)=436.52ms p(95)=984.26ms

    HTTP
    http_req_duration..............: avg=320.91ms min=97.39ms  med=107.35ms max=59.99s p(90)=436.52ms p(95)=984.26ms
      { expected_response:true }...: avg=288.68ms min=107.72ms med=134.94ms max=1.58s  p(90)=487.12ms p(95)=698.3ms 
    http_req_failed................: 89.60% 862 out of 962
    http_reqs......................: 962    7.503404/s

    EXECUTION
    iteration_duration.............: avg=1.82s    min=1.1s     med=1.71s    max=1m0s   p(90)=2.24s    p(95)=2.58s   
    iterations.....................: 962    7.503404/s
    vus............................: 1      min=1          max=20
    vus_max........................: 20     min=20         max=20

    NETWORK
    data_received..................: 617 kB 4.8 kB/s
    data_sent......................: 217 kB 1.7 kB/s

running (2m08.2s), 00/20 VUs, 962 complete and 0 interrupted iterations
default ✓ [======================================] 00/20 VUs  1m50s
ERRO[0128] thresholds on metrics 'http_req_failed' have been crossed

> Assumption

This scenario intentionally applies heavy concurrent load to identify API rate-limiting behavior.

> Expected behavior:

API should initially accept requests
Once request quota is exceeded, API should return rate-limit errors

> API limitation:

- Maximum 100 requests

> Result Summary
**Observed behavior**
- Initial requests returned: HTTP 200 OK


** After approximately 100 requests:**
- API started returning: HTTP 429 Too Many Requests

> This indicates:

- API rate limiting is enforced correctly

> Analysis
**Performance**
- Response time was initially stable
- After exceeding quota, requests were throttled
**Errors observed**
- HTTP 429 due to request limit exceeded
- Some requests timed out after prolonged throttling

> Conclusion
**High-load scenario successfully identified system limitation:**

✅ API handles requests normally under initial load
✅ Rate limiting activates after 100 requests
✅ API protects itself from excessive traffic

> Result:

- Threshold failed intentionally because test exceeded public API quota



# Test Run 2: Moderate Load Scenario (Normal Load) 

> Configuration
```javascript
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
```
> Assumption

- This scenario simulates realistic product creation traffic while staying below public API rate limit.

> Traffic assumptions:

- Low concurrent users
- Moderate request frequency
- Public API quota respected

> Result Summary
**Thresholds**

        Response time threshold:

        ✓ p(95)<2000
        p(95)=1.1s

        Error rate threshold:

        ✓ rate<0.05
        rate=0.00%

Both thresholds passed successfully.