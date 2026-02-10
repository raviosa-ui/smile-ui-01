const TARGET_CATEGORY = "Love";
const fs = require("fs");
const path = require("path");
const SITE_URL = "https://smileymeaning.com";
if (!process.env.ALLOW_WRITE) {
  console.error("❌ Write blocked. Use ALLOW_WRITE=1 to run this generator.");
  process.exit(1);
}

/* ================================
   LOVE CONTENT VARIATIONS
   ================================ */
const meaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is widely used to express love, affection, and deep emotional connection.</p>
      <p>It commonly appears in romantic messages, declarations of care, and heartfelt expressions.</p>
      <p>This emoji helps convey warmth and tenderness in a simple visual way.</p>
    `,
    (e) => `
      <p>People often use the ${e.name} emoji ${e.emoji} when sharing feelings of love or appreciation toward someone special.</p>
      <p>It visually represents moments of emotional closeness and romantic sentiment.</p>
      <p>The emoji adds sincerity and affection to digital conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is frequently included in loving messages and expressions of adoration.</p>
      <p>It highlights romantic feelings, care, and emotional bonds.</p>
      <p>This emoji is universally associated with love and warmth.</p>
    `,
    (e) => `
      <p>In online conversations, the ${e.name} emoji ${e.emoji} is a popular way to mark affectionate moments.</p>
      <p>It reflects deep care around relationships and positive emotions.</p>
      <p>The emoji reinforces a loving tone without extra words.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} symbolizes romance, passion, and heartfelt emotion.</p>
      <p>It is often shared when expressing love or strong attachment.</p>
      <p>This emoji visually communicates affection and devotion.</p>
    `,
    (e) => `
      <p>Many people use the ${e.name} emoji ${e.emoji} to enhance messages with a sense of love and closeness.</p>
      <p>It commonly appears in romantic greetings, confessions, and caring notes.</p>
      <p>The emoji adds a tender and loving feeling to conversations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} is associated with romantic moments and deep emotional ties.</p>
      <p>It helps express affection when sharing feelings or appreciation.</p>
      <p>This emoji is widely recognized as a symbol of love.</p>
    `,
    (e) => `
      <p>When people want to express love or show care for someone, they often use the ${e.name} emoji ${e.emoji}.</p>
      <p>It represents moments of romance, warmth, and shared affection.</p>
      <p>The emoji makes messages feel more intimate and loving.</p>
    `
  ]
};
const usageExplanationBlocks = {
  Love: [
    (e) => `
      <p>This emoji is commonly used in romantic chats, social media posts, and affectionate messages.</p>
      <p>It helps emphasize deep emotions and loving sentiments.</p>
    `,
    (e) => `
      <p>Using this emoji makes messages feel more heartfelt and intimate.</p>
      <p>It is often added to love declarations, compliments, and caring updates.</p>
    `,
    (e) => `
      <p>The emoji works well in both personal romantic conversations and expressions of familial love.</p>
      <p>It highlights moments of emotional connection.</p>
    `,
    (e) => `
      <p>This emoji is frequently used to support loving statements and expressions of care.</p>
      <p>It adds emotional depth without changing the message tone.</p>
    `,
    (e) => `
      <p>People include this emoji to visually reinforce affectionate messages.</p>
      <p>It makes digital communication more warm and romantic.</p>
    `,
    (e) => `
      <p>This emoji helps convey love quickly and clearly.</p>
      <p>It is widely understood across platforms and cultures.</p>
    `,
    (e) => `
      <p>It is commonly used when reacting to acts of kindness or romantic gestures.</p>
      <p>The emoji supports tender and uplifting communication.</p>
    `,
    (e) => `
      <p>This emoji is suitable for moments that call for affection and emotional expression.</p>
      <p>It enhances messages with a loving feel.</p>
    `
  ]
};
const detailedMeaningBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} goes beyond simple liking to represent deep love, romantic attachment, and profound emotional bonds in digital conversations. It instantly signals genuine affection, whether toward a partner, family member, or close friend.</p>
      <p>This visual cue helps bridge the emotional gap in text-based communication, making messages feel more intimate and sincere. Its universal appeal lies in its ability to amplify tender emotions without needing additional words.</p>
      <p>Across cultures, it evokes feelings of warmth and devotion, reinforcing the loving context of the message.</p>
    `,
    (e) => `
      <p>In today's messaging culture, the ${e.name} emoji ${e.emoji} serves as a powerful tool for expressing romantic love and heartfelt appreciation. It adds an immediate layer of tenderness to confessions, making ordinary expressions of care feel deeply meaningful.</p>
      <p>By incorporating this emoji, senders ensure their affection is unmistakable, reducing the risk of misinterpretation in short-form communication. It has become a staple for nurturing relationships and fostering emotional closeness online.</p>
      <p>The emoji's design elements contribute to its effectiveness in conveying pure, unfiltered love.</p>
    `,
    (e) => `
      <p>More than just decoration, the ${e.name} emoji ${e.emoji} embodies the essence of romance, care, and emotional intimacy. It is frequently deployed to acknowledge deep feelings, from passionate love to platonic affection.</p>
      <p>This emoji enhances emotional clarity by visually amplifying the sender's loving intent, which is particularly valuable in nuanced digital exchanges. Its presence transforms neutral text into something warm and memorable.</p>
      <p>Users appreciate how it effortlessly injects tenderness and sincerity into conversations centered around relationships.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} captures the spirit of love in its purest form, representing moments of devotion, passion, and emotional connection. It is a go-to choice for expressing affection and spreading warmth across chats and social feeds.</p>
      <p>In an era where tone can be easily lost in text, this emoji acts as a reliable indicator of care and adoration. It encourages engagement by making messages more inviting and emotionally resonant.</p>
      <p>Its widespread use underscores its role in modern communication as a universal symbol of love and heartfelt emotion.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Love: [
    (e) => `
      <p>In everyday scenarios, the ${e.name} emoji ${e.emoji} shines during romantic milestones like anniversaries, Valentine's Day, or confessions of love, where partners exchange it to show deep affection.</p>
      <p>On social media, it's common in posts celebrating relationships, engagements, or weddings, amplifying the romance for wider audiences.</p>
      <p>Family chats often feature it when expressing care for parents, siblings, or children, fostering emotional closeness even remotely.</p>
      <p>During dates or sweet moments, it pairs perfectly with loving messages to make affection feel more vivid and personal.</p>
    `,
    (e) => `
      <p>People frequently use the ${e.name} emoji ${e.emoji} in couple chats to react to thoughtful gestures, compliments, or "I love you" messages, creating instant warmth.</p>
      <p>Friends deploy it platonically after acts of support, while pet owners include it in posts about their beloved animals.</p>
      <p>In family threads, it's a staple for celebrating births, recoveries, or simply saying "thinking of you."</p>
      <p>Content creators often add it to captions expressing gratitude toward supportive followers.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} appears regularly in long-distance relationships when missing a partner or sending virtual hugs and kisses.</p>
      <p>Friends use it liberally for showing appreciation after help or shared experiences.</p>
      <p>During holidays like Mother's Day or Father's Day, social platforms overflow with this emoji as users honor loved ones.</p>
      <p>It's also popular in messages of encouragement, signaling emotional support and care.</p>
    `,
    (e) => `
      <p>In real-world digital interactions, the ${e.name} emoji ${e.emoji} is key for marking romantic dates, heartfelt apologies, or expressions of gratitude.</p>
      <p>Parents might see it in messages celebrating children's achievements with proud love.</p>
      <p>Couples use it after sweet surprises or daily affirmations, while friends share it upon reunions.</p>
      <p>Overall, it thrives in any context where affection is shared publicly or privately to reinforce emotional bonds.</p>
    `
  ]
};
const toneImpactBlocks = {
  Love: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} dramatically elevates the tone of a message, shifting it from neutral or friendly to deeply affectionate and romantic.</p>
      <p>It injects tender warmth, making recipients feel valued and emotionally connected.</p>
      <p>Even straightforward statements gain intimacy and sincerity, encouraging loving responses and deeper conversation.</p>
      <p>This emoji ensures that the affectionate intent is unmistakable, preventing any risk of the message feeling distant or casual.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} acts as a tone amplifier, transforming ordinary text into something intimate and heartfelt.</p>
      <p>It conveys genuine love and care, helping to build closeness and foster a softer, more romantic atmosphere in chats.</p>
      <p>By signaling pure affection, it reduces ambiguity and makes the overall emotional impact stronger and more touching.</p>
      <p>Users often find that adding it creates a ripple effect of warmth among conversation participants.</p>
    `,
    (e) => `
      <p>Adding the ${e.name} emoji ${e.emoji} instantly softens and warms the emotional tone, turning potentially plain statements into expressions of adoration and care.</p>
      <p>It reinforces sincerity in compliments, making the sender appear more devoted and tender.</p>
      <p>This visual boost helps maintain affectionate spirits in discussions and encourages others to match the loving energy.</p>
      <p>Overall, it plays a crucial role in shaping digital interactions to feel more human and emotionally intimate.</p>
    `,
    (e) => `
      <p>The presence of the ${e.name} emoji ${e.emoji} profoundly influences message tone by layering on unmistakable affection and romance.</p>
      <p>It softens formal text, adds depth to casual exchanges, and ensures loving emotions are front and center.</p>
      <p>Recipients perceive heightened care, which can improve mood and strengthen relationships through shared tenderness.</p>
      <p>Its impact lies in making communication feel more heartfelt and aligned with real-life expressions of love.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Love: [
    (e) => `
      <p>In casual settings among partners, friends, or family, the ${e.name} emoji ${e.emoji} is enthusiastically embraced to express affection without restraint.</p>
      <p>Within very relaxed professional environments with close colleagues, it might occasionally appear in friendly banter, but rarely.</p>
      <p>However, in most formal corporate communication, it may come across as too personal and inappropriate.</p>
      <p>Knowing the relationship dynamics and workplace culture helps determine if its romantic energy fits appropriately.</p>
    `,
    (e) => `
      <p>Casual conversations thrive with the ${e.name} emoji ${e.emoji}, where it freely enhances love notes, romantic wishes, or caring messages.</p>
      <p>In professional contexts, even with familiar colleagues, it's generally avoided to maintain boundaries.</p>
      <p>In client-facing or formal communication, opting for words over emojis preserves professionalism and clarity.</p>
      <p>Balancing its use based on audience expectations ensures it adds warmth only where appropriate.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} fits seamlessly into casual romantic or personal exchanges, amplifying affection without issue.</p>
      <p>In progressive professional settings, it is rarely used due to its strong romantic connotation.</p>
      <p>Traditional workplaces view it as unprofessional, preferring verbal expressions for any positive sentiment.</p>
      <p>Contextual awareness allows users to leverage its tenderness where it enhances personal rather than professional communication.</p>
    `,
    (e) => `
      <p>Casual use of the ${e.name} emoji ${e.emoji} is unrestricted, perfect for injecting romance into everyday loving moments with partners or close ones.</p>
      <p>Professionally, it's best avoided entirely to prevent misinterpretation or over-familiarity.</p>
      <p>In conservative fields, steering clear in written records preserves formality and appropriate boundaries.</p>
      <p>Adapting to the environment maximizes its ability to convey love effectively in personal scenarios.</p>
    `
  ]
};
const misuseBlocks = {
  Love: [
    (e) => `
      <p>One common misuse of the ${e.name} emoji ${e.emoji} is adding it to messages with strangers or in purely professional contexts, where it can appear overly familiar or inappropriate.</p>
      <p>During discussions of breakups, conflicts, or neutral topics, its presence might confuse recipients by implying unwanted affection.</p>
      <p>Sarcastic contexts can backfire, as the emoji's strong romantic connotation often overrides intended irony.</p>
      <p>Always considering the relationship and emotional context prevents it from undermining the message's true intent.</p>
    `,
    (e) => `
      <p>Overusing the ${e.name} emoji ${e.emoji} in non-romantic contexts dilutes its impact and can make senders seem insincere or overly affectionate.</p>
      <p>Placing it in formal apologies or complaints risks misinterpreting the tone as flirtatious.</p>
      <p>In group professional settings, it may create discomfort by appearing too personal.</p>
      <p>Mindful application ensures this powerful affectionate symbol enhances rather than complicates communication.</p>
    `,
    (e) => `
      <p>Applying the ${e.name} emoji ${e.emoji} too early in new relationships can exaggerate emotions or pressure the recipient.</p>
      <p>Using it in arguments or criticism might trivialize serious issues and escalate misunderstandings.</p>
      <p>Cultural differences can amplify misuse if expressions of love vary across regions.</p>
      <p>Pausing to assess alignment with the relationship stage and feeling avoids potential awkwardness.</p>
    `,
    (e) => `
      <p>Misplacing the ${e.name} emoji ${e.emoji} in professional announcements or platonic friendships (when unintended) can create mixed signals.</p>
      <p>Combining it with negative text produces confusing or hurtful contradictions.</p>
      <p>Habitual overuse in routine messages reduces its special romantic power over time.</p>
      <p>Strategic restraint preserves its effectiveness for genuine moments of love and affection.</p>
    `
  ]
};
const platformDisclaimerBlocks = {
  Love: [
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} may appear slightly different across platforms such as Google, Apple, WhatsApp, and Samsung.</p>
      <p>Despite visual differences, its loving meaning remains the same.</p>
    `,
    (e) => `
      <p>Different platforms render the ${e.name} emoji ${e.emoji} with unique designs.</p>
      <p>These variations do not change the emoji’s affectionate meaning.</p>
    `,
    (e) => `
      <p>The appearance of the ${e.name} emoji ${e.emoji} can vary by device or operating system.</p>
      <p>Its association with love and romance stays consistent.</p>
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
console.log(
  `🟢 Generating Love emojis:`,
  emojis.filter(e => e.category === TARGET_CATEGORY).length
);

emojis
  .filter(e => e.category === TARGET_CATEGORY)
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
console.log("✅ Love emoji pages generated successfully");