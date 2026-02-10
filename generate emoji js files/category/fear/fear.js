const fs = require("fs");
const path = require("path");
const TARGET_CATEGORY = "Fear";
const SITE_URL = "https://smileymeaning.com";
// ================================
// MANUAL OVERRIDE LOADER (ADD)
// ================================
function loadOverride(category, slug) {
  try {
    const overridePath = path.join(
      __dirname,
      "overrides",
      category.toLowerCase(),
      `${slug}.js`
    );
    return require(overridePath);
  } catch (err) {
    return {
      context: "",
      clarification: ""
    };
  }
}

if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}

/* ================================
   FEAR CONTENT VARIANTS (3 EACH)
   ~40–50 WORDS PER VARIANT
   ================================ */

const meaningBlocks = {
  Fear: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents fear, anxiety, and feeling threatened or unsafe. It is commonly used when someone feels scared, startled, or emotionally overwhelmed by a situation.</p>
      <p>This emoji visually communicates distress and heightened alertness.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} expresses fear, nervousness, or emotional unease. People use it to show concern, worry, or a sense of danger.</p>
      <p>It clearly signals discomfort and emotional vulnerability.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} symbolizes fear, panic, or anticipation of something unpleasant. It reflects moments when emotions shift toward caution, alarm, or emotional tension.</p>
      <p>This emoji helps convey fear quickly and clearly.</p>
    `
  ]
};

const usageExplanationBlocks = {
  Fear: [
    (e) => `
      <p>This emoji is commonly used when reacting to frightening news, stressful situations, or sudden surprises.</p>
      <p>It helps communicate that the sender feels scared or uneasy.</p>
    `,
    (e) => `
      <p>People use this emoji to express anxiety, worry, or nervous anticipation.</p>
      <p>It reinforces emotional honesty in moments of uncertainty.</p>
    `,
    (e) => `
      <p>This emoji appears in conversations discussing danger, fear of outcomes, or emotional stress.</p>
      <p>It ensures fear is not misinterpreted as neutrality.</p>
    `
  ]
};

const detailedMeaningBlocks = {
  Fear: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents an emotional state marked by fear and anxiety. It reflects moments when someone feels unsafe, startled, or emotionally threatened.</p>
      <p>Digitally, it replaces facial expressions that signal fear in real-life interactions.</p>
    `,
    (e) => `
      <p>More than a reaction, the ${e.name} emoji ${e.emoji} communicates heightened alertness and emotional tension.</p>
      <p>It is often used when someone anticipates danger or negative outcomes.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} captures fear-based emotional responses such as panic, anxiety, or dread.</p>
      <p>Its visual intensity helps clarify emotional state in text-only conversations.</p>
    `
  ]
};

const realLifeUsageBlocks = {
  Fear: [
    (e) => `
      <p>In real life, the ${e.name} emoji ${e.emoji} appears when someone experiences a scare, unexpected shock, or stressful situation.</p>
      <p>It is common in chats discussing emergencies or worrying events.</p>
    `,
    (e) => `
      <p>This emoji is used when expressing fear of outcomes, exams, health issues, or unknown results.</p>
      <p>It communicates emotional discomfort without long explanations.</p>
    `,
    (e) => `
      <p>People use the ${e.name} emoji ${e.emoji} during tense conversations involving uncertainty or risk.</p>
      <p>It signals the need for reassurance or emotional support.</p>
    `
  ]
};

const toneImpactBlocks = {
  Fear: [
    (e) => `
      <p>Adding the ${e.name} emoji ${e.emoji} shifts the tone of a message toward urgency and emotional tension.</p>
      <p>It signals that the message carries concern or alarm.</p>
    `,
    (e) => `
      <p>This emoji introduces nervousness or caution into communication.</p>
      <p>It helps ensure fear or anxiety is clearly felt by the reader.</p>
    `,
    (e) => `
      <p>The presence of this emoji creates a serious, uneasy tone.</p>
      <p>It alerts recipients to emotional distress or fear-driven concern.</p>
    `
  ]
};

const professionalVsCasualBlocks = {
  Fear: [
    (e) => `
      <p>In casual conversations, the ${e.name} emoji ${e.emoji} is often used to express fear, shock, or anxiety.</p>
      <p>It fits naturally in personal chats discussing stressful situations.</p>
    `,
    (e) => `
      <p>In professional environments, this emoji is rarely used.</p>
      <p>It may appear in informal internal chats discussing risk or concern, but not formal communication.</p>
    `,
    (e) => `
      <p>Professional settings usually favor clear wording over emotional symbols.</p>
      <p>Using this emoji cautiously helps avoid misinterpretation.</p>
    `
  ]
};

const misuseBlocks = {
  Fear: [
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} in positive or celebratory conversations can feel confusing.</p>
      <p>It introduces unnecessary anxiety into otherwise light messages.</p>
    `,
    (e) => `
      <p>Overusing this emoji can exaggerate fear and cause unnecessary concern.</p>
      <p>It should be reserved for genuinely stressful situations.</p>
    `,
    (e) => `
      <p>Using this emoji sarcastically can easily be misunderstood.</p>
      <p>Its emotional weight often overrides playful intent.</p>
    `
  ]
};

const platformDisclaimerBlocks = {
  Fear: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Apple, Google, and WhatsApp.</p>
      <p>Despite design differences, its fearful meaning remains consistent.</p>
    `,
    (e) => `
      <p>Visual variations of this emoji do not change its emotional interpretation.</p>
      <p>It universally represents fear.</p>
    `,
    (e) => `
      <p>Platform-specific designs may vary in intensity.</p>
      <p>The underlying fear-related meaning stays the same.</p>
    `
  ]
};

/* ================================
   HELPERS (STANDARD)
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
    
    ${selected.map(f => `<p><strong>${f.q}</strong><br>${f.a}</p>`).join("")}
  `;
}

function buildFunFact(e) {
  return e.fun_fact ? `<p>${e.fun_fact}</p>` : "";
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
const override = loadOverride(TARGET_CATEGORY, e.slug);
const manualContext = override.context || "";
const manualClarification = override.clarification || "";
const mainContent = buildIntro(e);

    let html = template;
    const title = `${e.name} Emoji ${e.emoji} Meaning`;
    const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples and fear-related context.`;
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
  .replace("{{INTRO_MEANING}}", mainContent)
  .replace("{{CHAT_EXAMPLES}}", buildChatExamples(e.chat_examples))
  .replace("{{USAGE_EXAMPLES}}", buildUsageExamples(e.usage_examples))
  .replace("{{DETAILED_MEANING}}", pickVariant(detailedMeaningBlocks, e))
  .replace("{{REAL_LIFE_USAGE}}", pickVariant(realLifeUsageBlocks, e))
  .replace("{{TONE_IMPACT}}", pickVariant(toneImpactBlocks, e))
  .replace("{{PROFESSIONAL_VS_CASUAL}}", pickVariant(professionalVsCasualBlocks, e))
  .replace("{{MISUSE}}", pickVariant(misuseBlocks, e))
  .replace("{{FUN_FACT}}", buildFunFact(e))
  .replace("{{FAQ}}", buildFAQSection(e))
  .replace("{{MANUAL_CONTEXT_SLOT}}", manualContext)
  .replace("{{MANUAL_CLARIFICATION_SLOT}}", manualClarification)
  .replace("{{WHEN_TO_USE}}", e.when_to_use || "")
  .replace("{{WHEN_NOT_TO_USE}}", e.when_not_to_use || "")
  .replace("{{PLATFORM_DISCLAIMER}}", pickVariant(platformDisclaimerBlocks, e))
  .replace("{{UNICODE_INFO}}", buildUnicodeInfo(e))
  .replace("{{RELATED_EMOJIS}}", buildRelated(e.related_emojis));

    const outDir = path.join("emoji", e.slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
  });

console.log("😨 Fear emoji pages generated successfully");
