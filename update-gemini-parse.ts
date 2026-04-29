import fs from 'fs';

let content = fs.readFileSync('src/services/geminiService.ts', 'utf8');

// Add parseCleanJSON
const utilFunc = `
function parseCleanJSON(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith('\`\`\`json')) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith('\`\`\`')) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith('\`\`\`')) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return JSON.parse(cleaned.trim());
}

export async function generateQuestionPaper`;

content = content.replace(/export async function generateQuestionPaper/, utilFunc);

// Replace JSON.parse(response.text)
content = content.replace(/JSON\.parse\(response\.text\)/g, 'parseCleanJSON(response.text)');

// Throw specific errors
content = content.replace(
  /throw new Error\("Failed to regenerate question. Please try again."\);/g,
  'throw new Error("Failed to regenerate question: " + (error instanceof Error ? error.message : String(error)));'
);

fs.writeFileSync('src/services/geminiService.ts', content);
