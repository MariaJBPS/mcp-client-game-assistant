import "dotenv/config";
import { createServer } from "http";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const server = createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        if (!body) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Empty body" }));
        }
        const { message } = JSON.parse(body);

        const result = await generateText({
          model: openrouter("openrouter/free"),
          prompt: message,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: result.text }));
      } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Failed" }));
      }
    });

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
