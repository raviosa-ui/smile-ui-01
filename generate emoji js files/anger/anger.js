const fs = require("fs");
const path = require("path");

const TARGET_CATEGORY = "Anger";
const SITE_URL = "https://smileymeaning.com";

if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}

/* ================================
   ANGER CONTENT VARIANTS (3 EACH)
   40–50 WORDS PER VARIANT
   ================================ */

const meaningBlocks = {
  Anger: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents anger, irritation, and emotional frustration. It is used when someone feels upset, annoyed, or provoked by a situation or person. This emoji visually communicates strong displeasure and signals that emotions are running high.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} expresses feelings of anger, annoyance, or intense dissatisfaction. People use it when emotions shift from calm to confrontational. It clearly indicates frustration or irritation that may require acknowledgment or resolution.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} symbolizes emotional tension, anger, and visible frustration. It often appears in moments of conflict or stress, helping convey displeasure when words alone may not fully capture the intensity of the feeling.</p>
    `
  ]
};

const usageExplanationBlocks = {
  Anger: [
    (e) => `
      <p>This emoji is commonly used in conversations where frustration, anger, or irritation needs to be expressed directly. It helps signal emotional boundaries and communicates dissatisfaction without lengthy explanations.</p>
    `,
    (e) => `
      <p>People use this emoji to respond to unfair situations, annoying behavior, or unresolved issues. It reinforces emotional honesty and makes it clear that something is bothering the sender.</p>
    `,
    (e) => `
      <p>This emoji appears in messages addressing conflict, stress, or emotional overwhelm. It helps convey anger quickly and ensures the emotional tone is not misunderstood.</p>
    `
  ]
};

const detailedMeaningBlocks = {
  Anger: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} represents a heightened emotional state marked by anger and irritation. It reflects moments when patience is tested and emotions intensify due to perceived injustice, stress, or confrontation.</p>
      <p>Digitally, it replaces facial cues that signal frustration in face-to-face interactions.</p>
    `,
    (e) => `
      <p>More than a simple reaction, the ${e.name} emoji ${e.emoji} conveys emotional escalation. It signals that calm discussion may be difficult and that feelings of annoyance or anger are dominant at the moment.</p>
      <p>This emoji helps establish emotional clarity in tense conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} captures emotional intensity associated with anger and frustration. It is often used when someone feels unheard, disrespected, or overwhelmed by a situation.</p>
      <p>Its visual strength ensures the emotion is clearly communicated.</p>
    `
  ]
};

const realLifeUsageBlocks = {
  Anger: [
    (e) => `
      <p>In real life, the ${e.name} emoji ${e.emoji} is used when reacting to unfair treatment, repeated mistakes, or stressful interactions. It often appears in private chats where people vent frustration or express emotional boundaries.</p>
    `,
    (e) => `
      <p>This emoji commonly appears in discussions about delays, broken promises, or unresolved problems. It helps communicate irritation without escalating into long arguments, making emotional intent clear.</p>
    `,
    (e) => `
      <p>People use the ${e.name} emoji ${e.emoji} to express anger during conflicts, debates, or moments of emotional overload. It signals the need for acknowledgment, space, or resolution.</p>
    `
  ]
};

const toneImpactBlocks = {
  Anger: [
    (e) => `
      <p>Adding the ${e.name} emoji ${e.emoji} sharply changes the tone of a message. It introduces emotional intensity, signaling frustration or anger and prompting readers to take the message seriously.</p>
    `,
    (e) => `
      <p>This emoji makes messages feel confrontational or emotionally charged. It reduces ambiguity and clearly communicates displeasure, ensuring the emotional weight of the message is understood.</p>
    `,
    (e) => `
      <p>The presence of this emoji creates a tense or urgent tone. It highlights emotional discomfort and encourages recipients to respond thoughtfully or address the underlying issue.</p>
    `
  ]
};

const professionalVsCasualBlocks = {
  Anger: [
    (e) => `
      <p>In casual conversations, the ${e.name} emoji ${e.emoji} is used to vent frustration or express annoyance among friends. It feels natural in informal settings where emotional expression is accepted.</p>
    `,
    (e) => `
      <p>In professional environments, this emoji is rarely appropriate. It may appear in informal internal chats but is generally avoided in formal emails or workplace communication.</p>
    `,
    (e) => `
      <p>Using this emoji professionally requires caution. Clear wording is usually preferred over emotional symbols to maintain professionalism and avoid misinterpretation.</p>
    `
  ]
};

const misuseBlocks = {
  Anger: [
    (e) => `
      <p>Using the ${e.name} emoji ${e.emoji} in lighthearted or celebratory conversations can feel jarring and inappropriate. It may confuse recipients or introduce unnecessary tension.</p>
    `,
    (e) => `
      <p>Overusing this emoji can escalate situations unnecessarily. It may amplify conflict even when calm discussion would be more effective.</p>
    `,
    (e) => `
      <p>Using this emoji sarcastically can easily be misunderstood. Its strong emotional signal often overrides subtle humor or irony.</p>
    `
  ]
};

const platformDisclaimerBlocks = {
  Anger: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Apple, Google, and WhatsApp.</p>
      <p>Despite visual differences, its meaning of anger and frustration remains consistent.</p>
    `,
    (e) => `
      <p>Different devices render this emoji in unique styles, but the emotional interpretation stays the same.</p>
      <p>It universally conveys anger.</p>
    `,
    (e) => `
      <p>Platform-specific designs do not change the emotional intent of the ${e.name} emoji ${e.emoji}.</p>
      <p>Its meaning is widely understood.</p>
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
    const desc = `Meaning of the ${e.name} emoji ${e.emoji}, with usage examples and anger-related context.`;
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

console.log("🔥 Anger emoji pages generated successfully");
