const axios = require("axios");
const fs = require("fs");
const path = require("path");

const prompt = process.env.PROMPT;

// 📁 sare files read karega
function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory() && file !== ".git") {
      results = results.concat(getAllFiles(filePath));
    } else {
      if (file.endsWith(".html") || file.endsWith(".css") || file.endsWith(".js")) {
        results.push(filePath);
      }
    }
  });

  return results;
}

async function runAI() {
  const files = getAllFiles(".");

  let projectCode = "";

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    projectCode += `\nFILE: ${file}\n${content}\n`;
  });

  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "qwen/qwen2.5-coder:free",
      messages: [
        {
          role: "system",
          content: `
You are a professional web developer.
User will give instruction.
Update ALL project files.

Return JSON like:
{
  "filename": "updated code"
}
`
        },
        {
          role: "user",
          content: `PROJECT CODE:\n${projectCode}\n\nINSTRUCTION:\n${prompt}`
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

  const updatedFiles = JSON.parse(output);

  for (let file in updatedFiles) {
    fs.writeFileSync(file, updatedFiles[file]);
  }
}

runAI();
