const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";

if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}

/* ================================
   HELPERS
   ================================ */
function buildParagraphs(textArray) {
  if (!textArray || !textArray.length) return "";
  return textArray.map(p => `<p>${p}</p>`).join("");
}

function buildUsageExamples(examples) {
  if (!examples || !examples.length) return "";
  return `<ul>${examples.map(x => `<li>${x}</li>`).join("")}</ul>`;
}

function buildChatExamples(chats) {
  if (!chats || !chats.length) return "";
  return chats.map(c => `
    <div class="chat-example">
      <p><strong>${c.context}:</strong></p>
      <p>Person A: ${c.person_a}</p>
      <p>Person B: ${c.person_b}</p>
      ${c.person_a_2 ? `<p>Person A: ${c.person_a_2}</p>` : ""}
      ${c.person_b_2 ? `<p>Person B: ${c.person_b_2}</p>` : ""}
    </div>
  `).join("");
}

function buildFAQSection(faqs) {
  if (!faqs || !faqs.length) return "";
  return faqs.map(f => `
    <div class="faq-item">
      <p><strong>${f.q}</strong></p>
      <p>${f.a}</p>
    </div>
  `).join("");
}

function buildUnicodeInfo(e) {
  return `
    <p><strong>Unicode name:</strong> ${e.unicode_name}</p>
    <p><strong>Unicode version:</strong> ${e.unicode_version}</p>
    <p><strong>Code point:</strong> ${e.codepoint}</p>
    <p><strong>Shortcodes:</strong> ${e.shortcodes ? e.shortcodes.join(", ") : ""}</p>
  `;
}

function buildRelated(list) {
  if (!list || !list.length) return "<p>No related emojis.</p>";
  return `<ul>${list.map(s => `<li><a href="/emoji/${s}/">${s.replace(/-/g," ")}</a></li>`).join("")}</ul>`;
}

/* ================================
   PAGE GENERATION ENGINE
   ================================ */
const template = fs.readFileSync("templates/emoji-page.html", "utf8");
const emojisBaseDir = "emojis";
const outputBaseDir = "emoji";

// Ensure output directory exists
if (!fs.existsSync(outputBaseDir)) {
  fs.mkdirSync(outputBaseDir, { recursive: true });
}

// 1. Get all category folders (e.g., 'love', 'thinking')
const categories = fs.readdirSync(emojisBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalGenerated = 0;

// 2. Loop through each category folder
categories.forEach(categoryFolder => {
  const categoryPath = path.join(emojisBaseDir, categoryFolder);
  
  // 3. Find all JSON files in this folder
  const emojiFiles = fs.readdirSync(categoryPath).filter(f => f.endsWith(".json"));
  
  console.log(`🟢 Building category: ${categoryFolder.toUpperCase()} (${emojiFiles.length} emojis)`);

  // 4. Generate the HTML for each JSON file
emojiFiles.forEach(file => {
    const filePath = path.join(categoryPath, file);
    let e;
    try {
        const rawData = fs.readFileSync(filePath, "utf8");
        e = JSON.parse(rawData);
    } catch (err) {
        console.error("\n❌ BROKEN JSON DETECTED!");
        console.error("File Path: ", filePath);
        console.error("Error Detail: ", err.message);
        process.exit(1); 
    }
    let html = template;
    const title = `${e.name} Emoji ${e.emoji} Meaning`;
    const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples and detailed explanation.`;
    const canonical = `${SITE_URL}/emoji/${e.slug}/`;

    html = html
      .replaceAll("{{PAGE_TITLE}}", title)
      .replaceAll("{{META_DESCRIPTION}}", desc)
      .replaceAll("{{OG_TITLE}}", title)
      .replaceAll("{{OG_DESCRIPTION}}", desc)
      .replaceAll("{{TWITTER_TITLE}}", title)
      .replaceAll("{{TWITTER_DESCRIPTION}}", desc)
      .replaceAll("{{CANONICAL_URL}}", canonical)
      .replaceAll("{{EMOJI}}", e.emoji)
      .replaceAll("{{EMOJI_NAME}}", e.name)
      .replaceAll("{{CATEGORY}}", e.category)
      .replaceAll("{{JSONLD_DESCRIPTION}}", desc)
      .replace("{{H1}}", title)
      .replace("{{INTRO_MEANING}}", `<p>${e.meaning}</p>`)
      .replace("{{CHAT_EXAMPLES}}", buildChatExamples(e.chat_examples))
      .replace("{{USAGE_EXAMPLES}}", buildUsageExamples(e.usage_examples))
      
      // All content pulled purely from the JSON arrays
      .replace("{{DETAILED_MEANING}}", buildParagraphs(e.detailed_meaning))
      .replace("{{REAL_LIFE_USAGE}}", buildParagraphs(e.real_life_usage))
      .replace("{{TONE_IMPACT}}", buildParagraphs(e.tone_impact))
      .replace("{{MISUSE}}", buildParagraphs(e.misuse))
      .replace("{{PROFESSIONAL_VS_CASUAL}}", buildParagraphs(e.professional_vs_casual))
      .replace("{{PLATFORM_DISCLAIMER}}", buildParagraphs(e.platform_appearance))

      .replace("{{FUN_FACT}}", e.fun_fact ? `<p>${e.fun_fact}</p>` : "")
      .replace("{{FAQ}}", buildFAQSection(e.faqs))
      .replace("{{WHEN_TO_USE}}", e.when_to_use || "")
      .replace("{{WHEN_NOT_TO_USE}}", e.when_not_to_use || "")
      .replace("{{UNICODE_INFO}}", buildUnicodeInfo(e))
      .replace("{{RELATED_EMOJIS}}", buildRelated(e.related_emojis));

    // 5. Save the generated HTML
    const outDir = path.join(outputBaseDir, e.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    
    totalGenerated++;
  });
});

console.log(`✅ Success! Generated ${totalGenerated} total emoji pages.`);