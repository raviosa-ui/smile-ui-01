const fs = require("fs");
const path = require("path");

const SITE_URL = "https://smileymeaning.com";

const emojis = JSON.parse(fs.readFileSync("emojis.json", "utf8"));
const template = fs.readFileSync("templates/emoji-page.html", "utf8");

/* ---------- helpers ---------- */

function paragraph(text) {
  return `<p>${text}</p>`;
}

function buildIntro(e) {
  return `
    <p>The ${e.name} emoji ${e.emoji} is commonly used to express celebration, excitement, and positive moments.</p>
    <p>${e.meaning}</p>
  `;
}

function buildUsageExamples(examples) {
  return `
    <ul>
      ${examples.map(e => `<li>${e}</li>`).join("")}
    </ul>
  `;
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

function buildPlatformDisclaimer(e) {
  return `
    <p>
      The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as
      Google, Apple, WhatsApp, and Samsung. These visual differences do not change the
      underlying meaning of celebration and excitement.
    </p>
  `;
}

function buildRelated(list) {
  if (!list || list.length === 0) return "<p>No related emojis.</p>";

  return `
    <ul>
      ${list.map(slug =>
        `<li><a href="/emoji/${slug}/">${slug.replace(/-/g, " ")}</a></li>`
      ).join("")}
    </ul>
  `;
}

/* ---------- generation ---------- */

emojis.forEach(e => {
  const pageTitle = `${e.name} Emoji ${e.emoji} Meaning`;
  const description = `Meaning of the ${e.name} emoji ${e.emoji}, including usage examples, chat conversations, and detailed explanation.`;
  const canonical = `${SITE_URL}/emoji/${e.slug}/`;

  let html = template;

  html = html.replaceAll("{{PAGE_TITLE}}", pageTitle);
  html = html.replaceAll("{{META_DESCRIPTION}}", description);
  html = html.replaceAll("{{OG_TITLE}}", pageTitle);
  html = html.replaceAll("{{OG_DESCRIPTION}}", description);
  html = html.replaceAll("{{TWITTER_TITLE}}", pageTitle);
  html = html.replaceAll("{{TWITTER_DESCRIPTION}}", description);
  html = html.replaceAll("{{CANONICAL_URL}}", canonical);

  html = html.replace("{{H1}}", `${e.name} Emoji ${e.emoji} Meaning`);
  html = html.replace("{{INTRO_MEANING}}", buildIntro(e));
  html = html.replace("{{USAGE_EXAMPLES}}", buildUsageExamples(e.usage_examples));
  html = html.replace("{{CHAT_EXAMPLES}}", buildChatExamples(e.chat_examples));
  html = html.replace("{{WHEN_TO_USE}}", e.when_to_use);
  html = html.replace("{{WHEN_NOT_TO_USE}}", e.when_not_to_use);
  html = html.replace("{{UNICODE_INFO}}", buildUnicodeInfo(e));
  html = html.replace("{{PLATFORM_DISCLAIMER}}", buildPlatformDisclaimer(e));
  html = html.replace("{{RELATED_EMOJIS}}", buildRelated(e.related_emojis));

  html = html.replace("{{CUSTOM_NOTE}}", e.custom_note ? paragraph(e.custom_note) : "");
  html = html.replace("{{CUSTOM_HTML}}", e.custom_html || "");

  const outDir = path.join("emoji", e.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
});

console.log("✅ Emoji pages generated successfully");
