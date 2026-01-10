const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// 1. Get the Key from GitHub Secrets
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    // 2. Use a fast model (Gemini 1.5 Flash is great for this)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. The Prompt: We ask for JSON specifically
    const prompt = `
      Generate a JSON list of 20 "trending" and popular emoji search terms for today.
      Mix viral trends, seasonal emojis (based on the current month), and evergreen popular ones.
      
      Strictly follow this JSON format:
      [
        { "query": "skull emoji", "value": "Viral" },
        { "query": "melting face", "value": "High" }
      ]
      
      Do not include markdown formatting like \`\`\`json. Just raw JSON.
    `;

    console.log("🤖 Asking Gemini for today's vibe...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up if Gemini accidentally adds markdown code blocks
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const trends = JSON.parse(cleanJson);

    // 4. Process and Check Folders (Your "Smart Link" Logic)
    const processedTrends = trends.map(item => {
      // Clean name
      const cleanName = item.query
        .toLowerCase()
        .replace(/ emoji/g, '')
        .replace(/ meaning/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim();
        
      const slug = cleanName.replace(/\s+/g, '-');

      // Check if folder exists
      const folderPath = path.join(__dirname, 'emoji', slug);
      const pageExists = fs.existsSync(folderPath);

      return {
        query: cleanName,
        value: item.value,
        slug: slug,
        hasPage: pageExists
      };
    });

    // 5. Save the file
    fs.writeFileSync('daily-emoji-trends.json', JSON.stringify(processedTrends, null, 2));
    console.log(`✅ Success! Gemini generated ${processedTrends.length} trends.`);

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    process.exit(1);
  }
}

run();
