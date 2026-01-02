const TARGET_SLUG = "black-heart";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) { console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator."); process.exit(1); }
/* ================================
   BLACK HEART 🖤 CONTENT
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a solid black heart, commonly used to express deep affection with a dark twist, sorrow, or dark humor.</p>
      <p>It often appears in messages conveying love for gothic styles, mourning, or edgy sarcasm.</p>
      <p>This emoji helps convey mystery, elegance, and intense emotion in a striking visual way.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in personal chats, social media posts, and messages with gothic, emo, or alternative aesthetics.</p>
      <p>It helps emphasize dark affection, grief, or morbid humor.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} depicts a classic heart filled entirely in black, symbolizing love intertwined with darkness, sorrow, or a sense of morbidity. It represents affection that carries an edgy, mysterious, or somber tone, often linked to dark humor or grief.</p>
      <p>This bold visual stands out in text communication for expressing complex emotions like deep love with intensity, support in mourning, or appreciation for black-themed elements. Its sleek design makes it popular in alternative subcultures across platforms.</p>
      <p>While primarily conveying love and affection despite its color, it frequently evokes themes of elegance, rebellion, dark aesthetics, or heartfelt sorrow in various contexts.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when expressing love for black clothing, music genres like metal, or gothic fashion.</p>
      <p>On social media, it's common in posts with dark aesthetics, emo vibes, or captions sharing grief and remembrance.</p>
      <p>Friends use it for dark jokes, sarcastic affection, or supporting each other through tough times.</p>
      <p>It also shows up in reactions to spooky content, alternative style shares, or any context blending love with mystery and edge.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} adds a mysterious, edgy layer to the tone, making messages feel intense, sophisticated, and darkly affectionate.</p>
      <p>It brings a sense of depth and intrigue, helping recipients sense strong emotion with a somber or humorous twist.</p>
      <p>Even positive statements gain an alternative vibe, while sorrowful ones feel more profound and stylish.</p>
      <p>This emoji signals complex feelings, often creating an atmosphere of elegance, rebellion, or empathetic darkness.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual personal settings among friends or alternative communities, the ${e.name} emoji ${e.emoji} is freely used to express edgy love or dark humor.</p>
      <p>In professional environments, its associations with sorrow or morbidity make it generally inappropriate for workplace communication.</p>
      <p>It fits best in private chats or social media where dark aesthetics and intense emotions are shared openly.</p>
      <p>Considering the audience helps avoid misinterpretation in more formal or sensitive contexts.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>A common misuse of the ${e.name} emoji ${e.emoji} is applying it in lighthearted or purely cheerful contexts, where its dark connotation may confuse or seem out of place.</p>
      <p>Using it insensitively around genuine grief can come across as trivializing real sorrow.</p>
      <p>Placing it in professional or uplifting messages creates mismatched signals due to its ties to darkness and morbidity.</p>
      <p>Using it thoughtfully ensures it conveys authentic edgy affection or appropriate somber tone rather than unintended negativity.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its black heart meaning remains consistent.</p>
    `
  ]
};
/* ================================
   HELPERS
   ================================ */
/* 1️⃣ ADD THIS FIRST */
function stableHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}
function pickVariant(blocks, e) {
  const list = blocks[e.category];
  if (!list || !list.length) return "";
  const index = stableHash(e.slug) % list.length;
  return list[index](e);
}
function buildIntro(e) {
  return (
    pickVariant(meaningBlocks, e) +
    `<p>${e.meaning}</p>` +
    pickVariant(usageExplanationBlocks, e)
  );
}
function buildUsageExamples(examples) {
  return `<ul>${examples.map(x => `<li>${x}</li>`).join("")}</ul>`;
}
function buildChatExamples(chats) {
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
function buildFAQSection(e) {
  if (!e.faqs || !e.faqs.length) return "";
  const start = e.slug.length % e.faqs.length;
  const selected = [];
  for (let i = 0; i < 3; i++) {
    selected.push(e.faqs[(start + i) % e.faqs.length]);
  }
  return `
    <h2>Frequently asked questions</h2>
    ${selected.map(f => `<p><strong>${f.q}</strong><br>${f.a}</p>`).join("")}
  `;
}
function buildFunFact(e) {
  return e.fun_fact ? `<h2>Fun fact</h2><p>${e.fun_fact}</p>` : "";
}
function buildUnicodeInfo(e) {
  return `
    <p><strong>Unicode name:</strong> ${e.unicode_name}</p>
    <p><strong>Unicode version:</strong> ${e.unicode_version}</p>
    <p><strong>Code point:</strong> ${e.codepoint}</p>
    <p><strong>Shortcodes:</strong> ${e.shortcodes.join(", ")}</p>
  `;
}
function buildRelated(list) {
  if (!list || !list.length) return "<p>No related emojis.</p>";
  return `<ul>${list.map(s => `<li><a href="/emoji/${s}/">${s.replace(/-/g," ")}</a></li>`).join("")}</ul>`;
}
/* ================================
   PAGE GENERATION
   ================================ */
const emojiDir = "emojis";
const emojiFiles = fs.readdirSync(emojiDir).filter(f => f.endsWith(".json"));
const emojis = emojiFiles.map(file =>
  JSON.parse(fs.readFileSync(path.join(emojiDir, file), "utf8"))
);
const template = fs.readFileSync("templates/emoji-page.html", "utf8");
emojis
  .filter(e => e.slug === TARGET_SLUG)
  .forEach(e => {
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
    .replace("{{H1}}", title)
    .replace(
      "{{INTRO_MEANING}}",
      buildIntro(e) +
      `<h2>Chat examples</h2>` +
      buildChatExamples(e.chat_examples) +
      `<h2>How people use this emoji</h2>` +
      buildUsageExamples(e.usage_examples) +
      `<h2>Emoji meaning in detail</h2>` +
      pickVariant(detailedMeaningBlocks, e) +
      `<h2>Real-life usage scenarios</h2>` +
      pickVariant(realLifeUsageBlocks, e) +
      `<h2>How this emoji affects tone and emotion</h2>` +
      pickVariant(toneImpactBlocks, e) +
      `<h2>Professional vs casual usage</h2>` +
      pickVariant(professionalVsCasualBlocks, e) +
      `<h2>Common mistakes and misuse</h2>` +
      pickVariant(misuseBlocks, e) +
      buildFunFact(e) +
      buildFAQSection(e)
    )
 .replace("{{WHEN_TO_USE}}", e.when_to_use || "")
  .replace("{{WHEN_NOT_TO_USE}}", e.when_not_to_use || "")
 .replace("{{PLATFORM_DISCLAIMER}}", pickVariant(platformDisclaimerBlocks, e))
    .replace("{{UNICODE_INFO}}", buildUnicodeInfo(e))
    .replace("{{RELATED_EMOJIS}}", buildRelated(e.related_emojis));
  const outDir = path.join("emoji", e.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
});
console.log("✅ Black Heart 🖤 emoji page content updated successfully");