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

const platformDisclaimerBlocks = {
  Celebration: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite design differences, the celebratory meaning remains consistent.</p>
    `,
    (e) => `
      <p>Visual variations of the ${e.name} emoji ${e.emoji} can be seen on different devices.</p>
      <p>These differences do not affect its joyful meaning.</p>
    `,
    (e) => `
      <p>The design of the ${e.name} emoji ${e.emoji} may change depending on the platform.</p>
      <p>Its association with celebration stays the same everywhere.</p>
    `,
    (e) => `
      <p>Across platforms, the ${e.name} emoji ${e.emoji} may look slightly different.</p>
      <p>However, its celebratory intent is universally understood.</p>
    `,
    (e) => `
      <p>Different platforms render the ${e.name} emoji ${e.emoji} in unique styles.</p>
      <p>The emoji consistently represents joy and celebration.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may vary in appearance across apps and devices.</p>
      <p>Its meaning remains positive and festive.</p>
    `,
    (e) => `
      <p>Platform-specific designs may affect how the ${e.name} emoji ${e.emoji} looks.</p>
      <p>The underlying celebratory meaning stays unchanged.</p>
    `,
    (e) => `
      <p>Although the ${e.name} emoji ${e.emoji} may be styled differently across platforms,</p>
      <p>it continues to represent celebration and happiness.</p>
    `
  ]
};

/* ================================
   HELPERS
   ================================ */

function pickVariant(blocks, e) {
  const list = blocks[e.category];
  if (!list) return "";
  const index = e.slug.length % list.length;
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
      <p><strong>${c.context} example:</strong></p>
      <p>Person A: ${c.person_a}</p>
      <p>Person B: ${c.person_b}</p>
    </div>
  `).join("");
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

const emojis = JSON.parse(fs.readFileSync("emojis.json", "utf8"));
const template = fs.readFileSync("templates/emoji-page.html", "utf8");

emojis.forEach(e => {
  const title = `${e.name} Emoji ${e.emoji} Meaning`;
  const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples, chat conversations, and detailed explanation.`;
  const canonical = `${SITE_URL}/emoji/${e.slug}/`;

  let html = template;

  html = html.replaceAll("{{PAGE_TITLE}}", title);
  html = html.replaceAll("{{META_DESCRIPTION}}", desc);
  html = html.replaceAll("{{OG_TITLE}}", title);
  html = html.replaceAll("{{OG_DESCRIPTION}}", desc);
  html = html.replaceAll("{{TWITTER_TITLE}}", title);
  html = html.replaceAll("{{TWITTER_DESCRIPTION}}", desc);
  html = html.replaceAll("{{CANONICAL_URL}}", canonical);

  html = html.replace("{{H1}}", title);
  html = html.replace("{{INTRO_MEANING}}", buildIntro(e));
  html = html.replace("{{USAGE_EXAMPLES}}", buildUsageExamples(e.usage_examples));
  html = html.replace("{{CHAT_EXAMPLES}}", buildChatExamples(e.chat_examples));
  html = html.replace("{{WHEN_TO_USE}}", e.when_to_use);
  html = html.replace("{{WHEN_NOT_TO_USE}}", e.when_not_to_use);
  html = html.replace("{{UNICODE_INFO}}", buildUnicodeInfo(e));
  html = html.replace("{{PLATFORM_DISCLAIMER}}", pickVariant(platformDisclaimerBlocks, e));
  html = html.replace("{{RELATED_EMOJIS}}", buildRelated(e.related_emojis));
  html = html.replace("{{CUSTOM_NOTE}}", e.custom_note ? `<p>${e.custom_note}</p>` : "");
  html = html.replace("{{CUSTOM_HTML}}", e.custom_html || "");

  const outDir = path.join("emoji", e.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
});

console.log("✅ Celebration emoji pages generated successfully");
