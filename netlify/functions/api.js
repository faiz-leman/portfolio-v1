const https = require("https");
const { URLSearchParams } = require("url");

exports.handler = async function (event, context) {
  console.log("Function called with method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    console.log("Raw event body:", event.body);
    const data = JSON.parse(event.body);
    console.log("Parsed data:", data);

    const formData = new URLSearchParams();
    formData.append("name", data.name || "");
    formData.append("project", data.project || "");
    formData.append("phone", data.phone || "");
    formData.append("email", data.email || "");
    formData.append("details", data.details || "");

    console.log("Sending request to PHP API...");

    const postData = formData.toString();

    const result = await new Promise((resolve, reject) => {
      // Change the options to include User-Agent:
      const options = {
        hostname: "email-notification.fwh.is",
        path: "/php/email.php",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(postData),
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      };

      const req = https.request(options, (res) => {
        let body = "";
        console.log("PHP API response status:", res.statusCode);
        console.log("PHP API response headers:", res.headers);

        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          console.log("Raw PHP response:", body);
          try {
            const result = JSON.parse(body);
            resolve(result);
          } catch (e) {
            console.error("JSON parse error:", e.message);
            console.error("Response that failed to parse:", body);
            reject(
              new Error("Invalid JSON response: " + body.substring(0, 200))
            );
          }
        });
      });

      req.on("error", (e) => {
        console.error("Request error:", e);
        reject(e);
      });

      req.write(postData);
      req.end();
    });

    console.log("PHP API result:", result);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: "Error contacting PHP API",
        error: error.message,
      }),
    };
  }
};
