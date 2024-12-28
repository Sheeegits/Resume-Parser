const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

async function parseResume(fileBuffer, fileType) {
  if (fileType === "application/pdf") {
    const data = await pdfParse(fileBuffer);
    return extractData(data.text);
  } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
    return extractData(value);
  }
}

function extractData(text) {
  // Basic extraction logic; replace with advanced AI parsing as needed
  const skills = text.match(/(JavaScript|Python|Java|SQL|React|Node.js|HTML|CSS)/gi) || [];
  const experience = text.match(/experience.*?(\d+ years?)/i) || [];
  return { skills, experience };
}

module.exports = { parseResume };
