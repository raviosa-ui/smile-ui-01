const fs = require("fs");
const path = require("path");
const TARGET_CATEGORY = "Joy";
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}
/* ================================
   JOY CONTENT VARIANTS
   ================================ */
const meaningBlocks = {
  Joy: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents happiness, positivity, and joyful emotions.</p>
      <p>It is commonly used to express good mood, excitement, or cheerful reactions.</p>
      <p>This emoji conveys a sense of light-hearted joy and emotional uplift.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is a visual symbol of happiness and cheerful feelings.</p>
      <p>People use it to show satisfaction, delight, or a positive emotional state.</p>
      <p>It adds warmth and friendliness to digital conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} expresses joy, contentment, and emotional positivity.</p>
      <p>It is often used when someone feels genuinely happy or pleased.</p>
      <p>This emoji helps communicate upbeat emotions clearly and instantly.</p>
    `,
    (e) => `
      <p>With its bright expression, the ${e.name} emoji ${e.emoji} captures pure happiness and delight.</p>
      <p>It is perfect for sharing moments of joy, laughter, or simple contentment.</p>
      <p>This emoji spreads positivity and uplifts the mood in any conversation.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Joy: [
    (e) => `
      <p>This emoji is commonly used in friendly chats, social media posts, and positive reactions.</p>
      <p>It helps reinforce happiness and cheerful intent in messages.</p>
    `,
    (e) => `
      <p>People use this emoji to respond to good news, funny moments, or pleasant experiences.</p>
      <p>It strengthens positive tone and emotional clarity.</p>
    `,
    (e) => `
      <p>It frequently appears in celebrations, gratitude messages, or light-hearted banter.</p>
      <p>The emoji enhances expressions of joy and emotional warmth.</p>
    `,
    (e) => `
      <p>This joyful emoji shines in replies to compliments, achievements, or happy updates.</p>
      <p>It instantly conveys enthusiasm and a sunny disposition.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Joy: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents an emotional state of happiness and joy. It is associated with positive feelings such as excitement, pleasure, and emotional satisfaction.</p>
      <p>In digital communication, it helps replace facial expressions that would normally signal happiness in face-to-face interactions.</p>
      <p>This emoji plays a key role in expressing optimism and emotional warmth online.</p>
    `,
    (e) => `
      <p>More than a simple smile, the ${e.name} emoji ${e.emoji} reflects an internal sense of joy and emotional well-being.</p>
      <p>It is frequently used to mark moments of happiness, achievement, or personal comfort.</p>
      <p>The emoji ensures that positive emotions are clearly understood in text-based conversations.</p>
    `,
    (e) => `
      <p>At its core, the ${e.name} emoji ${e.emoji} embodies genuine happiness and radiant positivity.</p>
      <p>It captures feelings of delight, contentment, and emotional fulfillment in a single symbol.</p>
      <p>This emoji bridges the gap between words and real-life cheerful expressions.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} goes beyond basic smiles to express deeper joy and elation.</p>
      <p>It symbolizes moments of pure bliss, satisfaction, and heartfelt positivity.</p>
      <p>In online exchanges, it reliably communicates uplifting emotions without ambiguity.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Joy: [
    (e) => `
      <p>In everyday messaging, the ${e.name} emoji ${e.emoji} appears when reacting to good news, celebrations, or pleasant surprises.</p>
      <p>On social media, it is widely used in captions, comments, and replies to express happiness.</p>
      <p>Friends and family use it to share cheerful moments and emotional positivity.</p>
    `,
    (e) => `
      <p>This emoji pops up during holidays, birthdays, or any moment worth celebrating.</p>
      <p>It frequently accompanies photos of fun events, achievements, or heartwarming stories.</p>
      <p>People rely on it to spread joy in group chats and personal conversations.</p>
    `,
    (e) => `
      <p>In daily digital life, the ${e.name} emoji ${e.emoji} reacts to jokes, compliments, or uplifting content.</p>
      <p>It enhances posts about travel, food, pets, or simple daily pleasures.</p>
      <p>Users choose it to instantly share happiness with friends and followers.</p>
    `,
    (e) => `
      <p>From announcing personal milestones to responding to funny memes, this emoji fits perfectly.</p>
      <p>It brightens comment sections, direct messages, and public updates alike.</p>
      <p>Everyone uses it to amplify joy in real-time online interactions.</p>
    `
  ]
};
const toneImpactBlocks = {
  Joy: [
    (e) => `
      <p>Adding the ${e.name} emoji ${e.emoji} makes messages feel lighter, warmer, and more emotionally positive.</p>
      <p>It softens communication and encourages friendly engagement.</p>
      <p>This emoji helps ensure that happiness and goodwill are clearly conveyed.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} instantly brightens the tone of any message.</p>
      <p>It adds a layer of cheerfulness and emotional openness to conversations.</p>
      <p>Using it fosters positivity and strengthens friendly connections.</p>
    `,
    (e) => `
      <p>Including this joyful emoji elevates mood and creates an uplifting atmosphere.</p>
      <p>It signals genuine happiness and invites reciprocal positive responses.</p>
      <p>The emoji enhances emotional expressiveness in digital exchanges.</p>
    `,
    (e) => `
      <p>This emoji transforms neutral text into something warm and inviting.</p>
      <p>It radiates positivity, reduces potential misinterpretation, and promotes joy.</p>
      <p>Overall, it makes interactions feel more heartfelt and cheerful.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Joy: [
    (e) => `
      <p>In casual conversations, the ${e.name} emoji ${e.emoji} is widely accepted and frequently used.</p>
      <p>In professional settings, it may appear in informal chats or friendly team communications.</p>
      <p>In formal business writing, its use is generally avoided.</p>
    `,
    (e) => `
      <p>This emoji thrives in personal and casual exchanges among friends or peers.</p>
      <p>In workplaces, it can lighten informal emails or team messaging apps.</p>
      <p>However, it is best omitted from official reports or serious correspondence.</p>
    `,
    (e) => `
      <p>Casual settings welcome the ${e.name} emoji ${e.emoji} as a natural expression of joy.</p>
      <p>In semi-professional environments, it suits relaxed team interactions.</p>
      <p>Formal contexts typically reserve emojis for minimal or no use.</p>
    `,
    (e) => `
      <p>Perfect for everyday chats, this emoji feels at home in informal communication.</p>
      <p>It can appear in friendly work channels but not in client-facing formal texts.</p>
      <p>Context dictates its appropriateness in professional environments.</p>
    `
  ]
};
const misuseBlocks = {
  Joy: [
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} in serious, negative, or sensitive conversations can feel inappropriate.</p>
      <p>It may also cause confusion if used sarcastically without clear context.</p>
      <p>Choosing the right emotional setting ensures its joyful meaning remains effective.</p>
    `,
    (e) => `
      <p>Placing this happy emoji in sad, angry, or tragic discussions can seem insensitive.</p>
      <p>Sarcastic usage risks misunderstanding the sender's true intent.</p>
      <p>Matching the emoji to the actual mood preserves its positive impact.</p>
    `,
    (e) => `
      <p>Inappropriate timing, such as during arguments or bad news, diminishes its value.</p>
      <p>Overuse can dilute its joyful effect in some conversations.</p>
      <p>Context awareness helps maintain its genuine expression of happiness.</p>
    `,
    (e) => `
      <p>This emoji clashes with topics involving grief, criticism, or formal complaints.</p>
      <p>Without supporting text, it might be misread as mocking in tense situations.</p>
      <p>Thoughtful placement keeps its cheerful message intact and appropriate.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Joy: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms like Apple, Google, WhatsApp, and Samsung.</p>
      <p>Despite visual variations, its joyful meaning remains consistent.</p>
    `,
    (e) => `
      <p>Design details of the ${e.name} emoji ${e.emoji} vary by platform, from Apple to Android and beyond.</p>
      <p>Core expression of happiness stays the same across all versions.</p>
    `,
    (e) => `
      <p>While rendering differs on iOS, Android, Windows, and other systems, the intent is unchanged.</p>
      <p>The ${e.name} emoji ${e.emoji} universally communicates joy and positivity.</p>
    `,
    (e) => `
      <p>Platform-specific styles give the ${e.name} emoji ${e.emoji} unique looks on different devices.</p>
      <p>Fortunately, its underlying message of happiness is always clear.</p>
    `
  ]
};
/* ================================
   HELPERS
   ================================ */
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
  .filter(e => e.category === TARGET_CATEGORY)
  .forEach(e => {
    let html = template;
    const title = `${e.name} Emoji ${e.emoji} Meaning`;
    const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples and joyful context.`;
    const canonical = `${SITE_URL}/emoji/${e.slug}/`;
    html = html
      .replaceAll("{{PAGE_TITLE}}", title)
  .replaceAll("{{META_DESCRIPTION}}", desc)
  .replaceAll("{{CANONICAL_URL}}", canonical)
  .replaceAll("{{OG_TITLE}}", title)
  .replaceAll("{{OG_DESCRIPTION}}", desc)
  .replaceAll("{{TWITTER_TITLE}}", title)
  .replaceAll("{{TWITTER_DESCRIPTION}}", desc)
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
console.log("✅ Joy emoji pages generated successfully");