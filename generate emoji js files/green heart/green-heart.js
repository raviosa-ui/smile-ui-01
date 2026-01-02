const TARGET_SLUG = "green-heart";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) { console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator."); process.exit(1); }

/* ================================
   GREEN HEART 💚 CONTENT
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a solid green heart, commonly used to express healthy love, growth, nature-inspired affection, or environmental care.</p>
      <p>It often appears in messages conveying fresh feelings, jealousy in a lighthearted way, or appreciation for green themes.</p>
      <p>This emoji helps convey vitality, harmony, and wholesome affection in a refreshing visual way.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in nature-loving chats, wellness messages, and expressions of growing or eco-friendly affection.</p>
      <p>It helps emphasize health, envy playfully, or love connected to the environment.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} depicts a classic heart in green, symbolizing love that is vibrant, healthy, and connected to growth or nature. It represents affection tied to renewal, environmental consciousness, or playful jealousy rather than intense passion.</p>
      <p>This fresh-toned visual stands out in text communication for conveying positive energy, support for eco-causes, or lighthearted teasing about envy. Its lively design makes it popular for expressing balanced, flourishing bonds across cultures.</p>
      <p>While primarily linked to love and affection, it frequently appears in contexts of nature, health awareness, St. Patrick's Day, or green aesthetics, highlighting its versatile role in uplifting, earthy emotional expression.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when sharing love for nature, celebrating personal growth, or jokingly acknowledging jealousy.</p>
      <p>On social media, it's common in posts about environmental activism, healthy lifestyles, or captions with green aesthetics like plants or forests.</p>
      <p>Friends use it for playful banter about envy, while couples include it to signify fresh, growing love.</p>
      <p>It also shows up in holiday greetings for St. Patrick's Day, eco-friendly content, or any context emphasizing vitality, harmony, and natural care.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} adds a fresh, vibrant layer to the tone, making messages feel lively, healthy, and positively affectionate.</p>
      <p>It brings a sense of growth and natural warmth, helping recipients feel energized and connected.</p>
      <p>Even neutral statements gain vitality, while caring messages feel more refreshing and balanced.</p>
      <p>This emoji signals wholesome energy and harmony, often creating an uplifting and eco-inspired emotional atmosphere.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual personal settings among friends or partners, the ${e.name} emoji ${e.emoji} is widely used to express nature-loving affection, growth, or light jealousy.</p>
      <p>In professional environments, its emotional and thematic nature makes it generally too personal unless in eco-related teams.</p>
      <p>It fits well in private chats or social media where conveying health, envy playfully, or environmental care is appropriate.</p>
      <p>Considering the context helps ensure it adds positive energy without seeming misplaced in formal settings.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>A common misuse of the ${e.name} emoji ${e.emoji} is using it in serious jealousy or toxic contexts, where its playful connotation may downplay real issues.</p>
      <p>Applying it in non-growth or unrelated situations can confuse recipients due to its ties to nature and health.</p>
      <p>Overusing it in aesthetics without emotional meaning dilutes its sincere representation of vibrant care.</p>
      <p>Using it thoughtfully preserves its role as a symbol of healthy, growing affection and environmental love.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its green heart meaning remains consistent.</p>
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
console.log("✅ Green Heart 💚 emoji page content updated successfully");