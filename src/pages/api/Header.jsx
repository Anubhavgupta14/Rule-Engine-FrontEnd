export default function Headers(method, body) {
    this.method = method;
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    if (body) {
      this.body = JSON.stringify(body);
    }
  }
  