const axios = require("axios");
const fs = require("fs");

const prompt = process.env.PROMPT;

async function runAI() {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "qwen/qwen2.5-coder:free",
      messages: [
        {
          role: "system",
          content: "You are a professional web developer. Modify website code."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const output = res.data.choices[0].message.content;

  // IMPORTANT: ye file change karega
  fs.writeFileSync("index.html", output);
}

runAI();
