const TARGET_SLUG = "blue-heart";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) { console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator."); process.exit(1); }
/* ================================
   BLUE HEART 💙 CONTENT
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a solid blue heart, commonly used to express calm love, trust, loyalty, and deep emotional stability.</p>
      <p>It often appears in messages conveying reliable affection, support, or appreciation for something associated with blue.</p>
      <p>This emoji helps convey peace, harmony, and steadfast care in a soothing visual way.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in supportive chats, friendship messages, and expressions of loyal or platonic affection.</p>
      <p>It helps emphasize trust, emotional depth, and serene love.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} depicts a classic heart in blue, symbolizing love that is calm, trustworthy, and enduring. It represents affection rooted in loyalty, peace, and emotional security rather than passionate intensity.</p>
      <p>This cool-toned visual stands out in text communication for conveying reliable support, harmony in relationships, or admiration without overwhelming heat. Its serene design makes it popular for expressing stable, long-term bonds across cultures.</p>
      <p>While primarily tied to love and friendship, it frequently appears in contexts of trust, mental health awareness, or appreciation for blue themes, highlighting its role in gentle, dependable emotional expression.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when showing support for friends, expressing loyalty in relationships, or sharing calm affection.</p>
      <p>On social media, it's common in posts about trusted partnerships, mental health solidarity, or captions with blue aesthetics like oceans or skies.</p>
      <p>Friends use it for platonic love and encouragement, while couples include it to signify steady, peaceful commitment.</p>
      <p>It also shows up in awareness campaigns, peaceful quotes, or any context emphasizing trust, harmony, and heartfelt reliability.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} adds a calm, soothing layer to the tone, making messages feel trustworthy, supportive, and peacefully affectionate.</p>
      <p>It brings a sense of stability and cool warmth, helping recipients feel secure and valued.</p>
      <p>Even intense emotions gain balance, while caring statements feel more reliable and comforting.</p>
      <p>This emoji signals dependable care and harmony, often creating a tranquil and reassuring emotional atmosphere.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual personal settings among friends or partners, the ${e.name} emoji ${e.emoji} is widely used to express loyalty, support, or calm affection.</p>
      <p>In professional environments, its emotional nature makes it somewhat personal but more acceptable than hotter colors in team encouragement.</p>
      <p>It fits well in private chats or social media where conveying trust and care is appropriate.</p>
      <p>Considering the relationship helps ensure it adds warmth without seeming overly intimate in formal contexts.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>A common misuse of the ${e.name} emoji ${e.emoji} is using it in highly passionate or heated romantic contexts, where its calm connotation may dampen the intended intensity.</p>
      <p>Applying it sarcastically or in conflicting situations can confuse recipients due to its association with trust and peace.</p>
      <p>Overusing it in unrelated aesthetics without emotional meaning dilutes its sincere representation of stable care.</p>
      <p>Using it thoughtfully preserves its role as a symbol of loyal, serene affection and support.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its blue heart meaning remains consistent.</p>
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
console.log("✅ Blue Heart 💙 emoji page content updated successfully");