const TARGET_SLUG = "yellow-heart";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) { console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator."); process.exit(1); }
/* ================================
   YELLOW HEART 💛 CONTENT
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a solid yellow heart, commonly used to express warm friendship, happiness, and cheerful affection.</p>
      <p>It often appears in messages conveying joy, platonic love, or appreciation for sunny, positive vibes.</p>
      <p>This emoji helps convey brightness, optimism, and heartfelt care in a sunny visual way.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in friendly chats, uplifting messages, and expressions of joyful or platonic affection.</p>
      <p>It helps emphasize happiness, warmth, and positive emotions.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} depicts a classic heart in bright yellow, symbolizing love that is warm, friendly, and full of joy. It represents affection rooted in happiness, optimism, and strong platonic bonds rather than romantic passion.</p>
      <p>This sunny visual stands out in text communication for conveying cheerfulness, support during happy times, or admiration with a lighthearted feel. Its vibrant design makes it popular for expressing genuine warmth and positivity across cultures.</p>
      <p>While primarily tied to friendship and joy, it frequently appears in contexts of celebration, gratitude, summer vibes, or yellow-themed aesthetics, highlighting its role in bright, uplifting emotional expression.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when celebrating friendships, sharing good news, or expressing sunny affection.</p>
      <p>On social media, it's common in posts about happy moments, best friend tributes, or captions with yellow aesthetics like sunflowers or smiles.</p>
      <p>Friends use it for platonic love and encouragement, while anyone can include it to spread positivity and joy.</p>
      <p>It also shows up in gratitude messages, cheerful quotes, or any context emphasizing happiness, warmth, and heartfelt friendship.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} adds a bright, cheerful layer to the tone, making messages feel warm, happy, and positively affectionate.</p>
      <p>It brings a sense of sunshine and optimism, helping recipients feel uplifted and appreciated.</p>
      <p>Even neutral statements gain cheer, while caring messages feel more joyful and radiant.</p>
      <p>This emoji signals genuine happiness and warmth, often creating a sunny and feel-good emotional atmosphere.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual personal settings among friends or family, the ${e.name} emoji ${e.emoji} is widely used to express joyful affection, friendship, or positivity.</p>
      <p>In professional environments, its cheerful nature makes it somewhat acceptable in light team encouragement or informal chats.</p>
      <p>It fits well in private conversations or social media where conveying happiness and warmth is appropriate.</p>
      <p>Considering the context helps ensure it adds positivity without seeming too casual in formal settings.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>A common misuse of the ${e.name} emoji ${e.emoji} is using it in somber or deeply romantic contexts, where its cheerful connotation may feel mismatched or insensitive.</p>
      <p>Applying it sarcastically or in negative situations can confuse recipients due to its association with joy and friendship.</p>
      <p>Overusing it in unrelated aesthetics without emotional meaning dilutes its sincere representation of happy care.</p>
      <p>Using it thoughtfully preserves its role as a symbol of bright, platonic affection and optimism.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its yellow heart meaning remains consistent.</p>
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
console.log("✅ Yellow Heart 💛 emoji page content updated successfully");