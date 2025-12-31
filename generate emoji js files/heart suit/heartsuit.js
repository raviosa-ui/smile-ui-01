const TARGET_SLUG = "heart-suit";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) { console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator."); process.exit(1); }

/* ================================
   HEART SUIT ♥️ CONTENT
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a classic playing card suit symbol representing the hearts suit, commonly used to express love, affection, or romantic interest.</p>
      <p>It frequently appears in messages as a stylish alternative to the standard red heart, adding a touch of card-game flair.</p>
      <p>This emoji helps convey warmth and caring in a simple, iconic way rooted in traditional symbolism.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in romantic chats, card game references, and messages expressing love or fondness.</p>
      <p>It helps emphasize affection with a vintage, playing-card aesthetic.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents the hearts suit from a standard deck of playing cards, where hearts traditionally symbolize love, emotion, and romance. Its bold red design makes it a popular choice for conveying affection with a classic, timeless feel.</p>
      <p>This visual reference bridges card symbolism with modern messaging, instantly evoking ideas of love and caring without being overly cute or modern. Its origins in card games give it a slightly retro or playful edge compared to plain heart emojis.</p>
      <p>While strongly tied to romance, it can also reference actual card games or gambling, though its primary digital use remains as a symbol of love and heartfelt sentiment across cultures.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when someone wants to express love in a classic or slightly formal way, such as in Valentine's messages or long-term relationships.</p>
      <p>On social media, it's common in posts referencing poker, card games, or as a sophisticated alternative to more cartoonish hearts.</p>
      <p>Couples use it for a vintage romantic vibe, while friends might include it when talking about games or luck in love.</p>
      <p>It also shows up in casino-related content, gambling references, or any context blending romance with traditional card symbolism.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} adds a classic, elegant layer to the tone, making messages feel timeless and sincerely affectionate.</p>
      <p>It brings a sense of traditional romance and warmth, helping recipients feel genuinely cared for.</p>
      <p>Even casual texts gain a touch of sophistication, while romantic statements feel more heartfelt and enduring.</p>
      <p>This emoji signals mature affection and classic sentiment, often evoking nostalgia or playful card-game references.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual personal settings among friends or partners, the ${e.name} emoji ${e.emoji} is widely used to express love or reference card games without issue.</p>
      <p>In professional environments, its romantic connotation generally makes it too personal for workplace communication.</p>
      <p>It fits best in private chats, gaming discussions, or social media where affection or card references are appropriate.</p>
      <p>Considering the context helps avoid sending unintended romantic signals in formal settings.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>A common misuse of the ${e.name} emoji ${e.emoji} is using it in professional or platonic contexts where its strong love association can be misinterpreted as romantic interest.</p>
      <p>Overusing it in non-romantic card game discussions may confuse recipients expecting a literal playing card reference.</p>
      <p>Placing it in negative or sarcastic messages creates conflicting signals due to its positive, affectionate meaning.</p>
      <p>Using it thoughtfully ensures it conveys genuine love or proper card-suit reference rather than mixed intentions.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its heart suit meaning remains consistent.</p>
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
console.log("✅ Heart Suit ♥️ emoji page content updated successfully");