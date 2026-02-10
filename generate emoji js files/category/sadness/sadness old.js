const fs = require("fs");
const path = require("path");

const TARGET_CATEGORY = "Sadness";
const SITE_URL = "https://smileymeaning.com";

if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}

/* ================================
   SADNESS CONTENT VARIANTS (3 EACH)
   ================================ */

const meaningBlocks = {
  Sadness: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents sadness, emotional pain, or feeling down.</p>
      <p>It is commonly used to express disappointment, hurt feelings, or quiet sorrow.</p>
      <p>This emoji visually conveys emotional heaviness and vulnerability.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} reflects feelings of sadness, loss, or emotional discomfort.</p>
      <p>People use it when words alone feel insufficient to express how they feel.</p>
      <p>It helps communicate emotional pain in a simple, recognizable way.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} symbolizes emotional sadness and low mood.</p>
      <p>It often appears in messages expressing grief, regret, or disappointment.</p>
      <p>This emoji adds emotional clarity to difficult conversations.</p>
    `
  ]
};

const usageExplanationBlocks = {
  Sadness: [
    (e) => `
      <p>This emoji is commonly used in personal conversations to express sadness or emotional struggle.</p>
      <p>It helps signal that the sender is feeling low or vulnerable.</p>
    `,
    (e) => `
      <p>People use this emoji to respond to disappointing news or emotional situations.</p>
      <p>It adds emotional depth to messages that describe hardship.</p>
    `,
    (e) => `
      <p>This emoji appears in supportive conversations where emotions need acknowledgment.</p>
      <p>It reinforces honesty about feeling sad or hurt.</p>
    `
  ]
};

const detailedMeaningBlocks = {
  Sadness: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents an emotional state associated with sadness, loss, or inner pain. It reflects moments when someone feels emotionally overwhelmed or discouraged.</p>
      <p>In digital communication, it replaces facial expressions that would normally signal sadness in real life.</p>
      <p>This emoji helps convey sincerity and emotional openness.</p>
    `,
    (e) => `
      <p>More than a visual symbol, the ${e.name} emoji ${e.emoji} communicates vulnerability and emotional heaviness.</p>
      <p>It is often used during moments of grief, disappointment, or emotional reflection.</p>
      <p>The emoji ensures that sadness is clearly understood in text-based messages.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} captures feelings of sorrow and emotional fatigue.</p>
      <p>It is used when someone wants to express pain without explaining everything in words.</p>
      <p>This emoji supports emotional honesty in difficult conversations.</p>
    `
  ]
};

const realLifeUsageBlocks = {
  Sadness: [
    (e) => `
      <p>In real life, the ${e.name} emoji ${e.emoji} appears when someone shares bad news, personal loss, or disappointment.</p>
      <p>Friends often use it to express empathy or emotional struggle in private chats.</p>
      <p>It is common in messages asking for understanding or support.</p>
    `,
    (e) => `
      <p>People use this emoji when plans fall through, expectations are unmet, or emotions feel heavy.</p>
      <p>On social media, it may appear in reflective or emotional posts.</p>
      <p>The emoji helps communicate sadness without lengthy explanations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is often used in conversations about stress, loneliness, or emotional exhaustion.</p>
      <p>It can signal the need for comfort or reassurance.</p>
      <p>This makes it an important tool for emotional expression online.</p>
    `
  ]
};

const toneImpactBlocks = {
  Sadness: [
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} immediately shifts the tone of a message toward seriousness and emotional depth.</p>
      <p>It signals vulnerability and invites empathy from the reader.</p>
      <p>This emoji helps prevent messages from sounding emotionally flat.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} softens language while emphasizing emotional pain.</p>
      <p>It makes sadness more visible and harder to ignore.</p>
      <p>This tone shift encourages supportive responses.</p>
    `,
    (e) => `
      <p>Adding this emoji introduces a somber and reflective tone.</p>
      <p>It clarifies that the message carries emotional weight.</p>
      <p>The emoji helps set expectations for empathy and care.</p>
    `
  ]
};

const professionalVsCasualBlocks = {
  Sadness: [
    (e) => `
      <p>In casual conversations, the ${e.name} emoji ${e.emoji} is commonly used to express personal feelings.</p>
      <p>It fits naturally in messages between friends or family.</p>
      <p>Its emotional nature makes it less suitable for formal communication.</p>
    `,
    (e) => `
      <p>In professional environments, this emoji may appear in informal internal chats when discussing stress or setbacks.</p>
      <p>It is generally avoided in formal emails or official documents.</p>
      <p>Context and workplace culture determine its appropriateness.</p>
    `,
    (e) => `
      <p>This emoji works best in personal or semi-informal conversations.</p>
      <p>In professional settings, words are usually preferred over emotional symbols.</p>
      <p>Using it carefully helps maintain professionalism.</p>
    `
  ]
};

const misuseBlocks = {
  Sadness: [
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} in happy or celebratory conversations can create confusion.</p>
      <p>It may clash with positive tone and feel out of place.</p>
      <p>Matching emotional context is important.</p>
    `,
    (e) => `
      <p>Overusing this emoji in neutral situations can exaggerate emotional impact.</p>
      <p>It may cause others to worry unnecessarily.</p>
      <p>Thoughtful use preserves its sincerity.</p>
    `,
    (e) => `
      <p>Using this emoji sarcastically can be misunderstood.</p>
      <p>Its emotional weight often overrides intended irony.</p>
      <p>Clear wording helps prevent misinterpretation.</p>
    `
  ]
};

const platformDisclaimerBlocks = {
  Sadness: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may look slightly different across platforms like Apple, Google, and WhatsApp.</p>
      <p>Despite design differences, its sad meaning remains consistent.</p>
    `,
    (e) => `
      <p>Different devices render the ${e.name} emoji ${e.emoji} in unique styles.</p>
      <p>The emotional meaning stays the same across platforms.</p>
    `,
    (e) => `
      <p>Visual variations of the ${e.name} emoji ${e.emoji} do not affect its emotional interpretation.</p>
      <p>It universally represents sadness.</p>
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
    const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples and emotional context.`;
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

console.log("✅ Sadness emoji pages generated successfully");
