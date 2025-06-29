import http from "k6/http";
import { check } from "k6";

export const options = {
  tags: {
    name: "staged_test_x",
    type: "loadtest",
    testid: "workshop-01"
  },
  scenarios: {
    workshop_01: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "72s", target: 10 }, // ramp-up
        { duration: "72s", target: 10 }, // steady
        { duration: "36s", target: 0 } // ramp-down
      ]
    }
  }
};

export default function () {
  const res = http.get("http://192.168.3.140/api/v1/product/1");
  check(res, {
    "status is 200": (r) => r.status === 200,
    "body is not empty": (r) => r.body.length > 0
  });
}
