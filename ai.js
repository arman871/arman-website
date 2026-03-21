const axios = require("axios");
const fs = require("fs");

const prompt = process.env.PROMPT;

async function runAI() {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen2.5-coder:free",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON. No explanation."
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

    let output = res.data.choices[0].message.content;

    console.log("AI OUTPUT:", output);

    // clean markdown
    output = output.replace(/```json/g, "").replace(/```/g, "").trim();

    let data;

    try {
      data = JSON.parse(output);
    } catch (e) {
      console.log("JSON ERROR:", output);
      process.exit(1);
    }

    if (!data.file || !data.content) {
      console.log("Invalid format");
      process.exit(1);
    }

    fs.writeFileSync(data.file, data.content);

    console.log("File updated:", data.file);

  } catch (err) {
    console.error("API ERROR:", err.message);
    process.exit(1);
  }
}

runAI();
