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
          content: `
You are a web developer.
Do NOT return full code.

Only return small updates like:
{
  "file": "index.html",
  "content": "updated code"
}
`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: \`Bearer ${process.env.OPENROUTER_API_KEY}\`,
        "Content-Type": "application/json"
      }
    }
  );

  let output = res.data.choices[0].message.content;

  output = output.replace(/```json/g, "").replace(/```/g, "").trim();

  const data = JSON.parse(output);

  fs.writeFileSync(data.file, data.content);
}

runAI();
