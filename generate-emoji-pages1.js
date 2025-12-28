const fs = require("fs");
const path = require("path");

const SITE_URL = "https://smileymeaning.com";

/* ================================
   CELEBRATION CONTENT VARIATIONS
   ================================ */

const meaningBlocks = {
  Celebration: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is widely used to express celebration, happiness, and positive moments.</p>
      <p>It commonly appears in messages related to achievements, good news, and festive occasions.</p>
      <p>This emoji helps convey excitement and joy in a simple visual way.</p>
    `,
    (e) => `
      <p>People often use the ${e.name} emoji ${e.emoji} when sharing success stories or happy announcements.</p>
      <p>It visually represents moments that are worth celebrating and remembering.</p>
      <p>The emoji adds enthusiasm and warmth to digital conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is frequently included in celebratory messages and congratulatory texts.</p>
      <p>It highlights achievements, milestones, and special events.</p>
      <p>This emoji is universally associated with joyful moments.</p>
    `,
    (e) => `
      <p>In online conversations, the ${e.name} emoji ${e.emoji} is a popular way to mark happy outcomes.</p>
      <p>It reflects excitement around accomplishments and positive updates.</p>
      <p>The emoji reinforces a celebratory tone without extra words.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} symbolizes success, joy, and festive energy.</p>
      <p>It is often shared when something good happens or a goal is achieved.</p>
      <p>This emoji visually communicates happiness and celebration.</p>
    `,
    (e) => `
      <p>Many people use the ${e.name} emoji ${e.emoji} to enhance messages with a sense of celebration.</p>
      <p>It commonly appears in greetings, announcements, and congratulatory notes.</p>
      <p>The emoji adds a cheerful and upbeat feeling to conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is associated with festive moments and positive milestones.</p>
      <p>It helps express excitement when sharing good news or achievements.</p>
      <p>This emoji is widely recognized as a symbol of celebration.</p>
    `,
    (e) => `
      <p>When people want to express joy or mark a special occasion, they often use the ${e.name} emoji ${e.emoji}.</p>
      <p>It represents moments of happiness, success, and shared excitement.</p>
      <p>The emoji makes messages feel more lively and celebratory.</p>
    `
  ]
};

const usageExplanationBlocks = {
  Celebration: [
    (e) => `
      <p>This emoji is commonly used in casual chats, social media posts, and congratulatory messages.</p>
      <p>It helps emphasize positive emotions and joyful announcements.</p>
    `,
    (e) => `
      <p>Using this emoji makes messages feel more expressive and enthusiastic.</p>
      <p>It is often added to celebrations, greetings, and success updates.</p>
    `,
    (e) => `
      <p>The emoji works well in both personal and informal professional conversations.</p>
      <p>It highlights moments worth celebrating.</p>
    `,
    (e) => `
      <p>This emoji is frequently used to support happy statements and good news.</p>
      <p>It adds emotional emphasis without changing the message tone.</p>
    `,
    (e) => `
      <p>People include this emoji to visually reinforce celebratory messages.</p>
      <p>It makes digital communication more engaging and cheerful.</p>
    `,
    (e) => `
      <p>This emoji helps convey excitement quickly and clearly.</p>
      <p>It is widely understood across platforms and cultures.</p>
    `,
    (e) => `
      <p>It is commonly used when reacting to achievements or milestones.</p>
      <p>The emoji supports positive and uplifting communication.</p>
    `,
    (e) => `
      <p>This emoji is suitable for moments that call for joy and recognition.</p>
      <p>It enhances messages with a celebratory feel.</p>
    `
  ]
};

const detailedMeaningBlocks = {
  Celebration: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is more than a simple symbol of celebration. In digital communication, it represents shared happiness, excitement, and positive acknowledgment.</p>
      <p>People often use this emoji to visually emphasize that something meaningful or joyful has happened.</p>
      <p>This makes the ${e.name} emoji especially popular in fast-paced conversations where clarity and emotional tone matter.</p>
    `,
    (e) => `
      <p>In modern messaging, the ${e.name} emoji ${e.emoji} plays an important role in expressing emotional reactions.It adds energy and warmth to messages that announce good news or achievements.</p>
      <p>The emoji helps reduce ambiguity by clearly signaling a positive emotional response.Readers immediately understand that the message carries excitement.</p>
      <p>This visual clarity is why the emoji is frequently used across social platforms.</p>
    `
  ]
};

const realLifeUsageBlocks = {
  Celebration: [
    (e) => `
      <p>In real-life conversations, the ${e.name} emoji ${e.emoji} is often used to react to accomplishments such as promotions or milestones.</p>
      <p>On social media, it frequently appears in captions announcing launches or birthdays.</p>
      <p>In group chats, this emoji helps collectively celebrate shared wins.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is commonly seen in professional and personal settings alike.</p>
      <p>Teams may use it when celebrating deadlines met or goals achieved, while friends use it for birthdays and celebrations.</p>
      <p>Its flexibility makes it suitable for many positive contexts.</p>
    `
  ]
};

const toneImpactBlocks = {
  Celebration: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} significantly affects the emotional tone of a message.</p>
      <p>By adding this emoji, a simple statement can feel more enthusiastic and friendly.</p>
      <p>It helps ensure that positive intent is clearly communicated.</p>
    `,
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} enhances emotional clarity in digital communication.</p>
      <p>It visually reinforces happiness and excitement.</p>
      <p>This is especially useful in short messages.</p>
    `
  ]
};

const professionalVsCasualBlocks = {
  Celebration: [
    (e) => `
      <p>In casual conversations, the ${e.name} emoji ${e.emoji} is widely accepted.</p>
      <p>Friends and family often include it when celebrating milestones.</p>
      <p>In professional settings, it can be appropriate when informal.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may be suitable in relaxed workplace cultures.</p>
      <p>In formal communication, it may feel out of place.</p>
      <p>Understanding context helps ensure effective usage.</p>
    `
  ]
};

const misuseBlocks = {
  Celebration: [
    (e) => `
      <p>Although the ${e.name} emoji ${e.emoji} is positive, it should be avoided in serious conversations.</p>
      <p>Using it during sensitive discussions can feel inappropriate.</p>
      <p>Being mindful of context ensures it is received positively.</p>
    `,
    (e) => `
      <p>Misusing the ${e.name} emoji ${e.emoji} may cause confusion.</p>
      <p>In emotionally complex discussions, it may reduce seriousness.</p>
      <p>Understanding timing is key.</p>
    `
  ]
};


const platformDisclaimerBlocks = {
  Celebration: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its celebratory meaning remains the same.</p>
    `,
    (e) => `
      <p>Different platforms render the ${e.name} emoji ${e.emoji} with unique designs.</p>
      <p>These variations do not change the emoji’s joyful meaning.</p>
    `,
    (e) => `
      <p>The appearance of the ${e.name} emoji ${e.emoji} can vary by device or operating system.</p>
      <p>Its association with celebration and happiness stays consistent.</p>
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
  if (!list) return "";
  return list[e.slug.length % list.length](e);
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

emojis.forEach(e => {
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

console.log("✅ Celebration emoji pages generated successfully");
