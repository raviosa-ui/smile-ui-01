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
      <p>The ${e.name} emoji ${e.emoji} goes beyond basic happiness to represent triumphant moments, shared joy, and festive energy in digital conversations. It instantly signals that something worth celebrating has occurred, whether it's a personal achievement, a team success, or a special occasion.</p>
      <p>This visual cue helps bridge the emotional gap in text-based communication, making messages feel more vibrant and heartfelt. Its universal appeal lies in its ability to amplify positive emotions without needing additional words.</p>
      <p>Across cultures, it evokes feelings of accomplishment and excitement, reinforcing the celebratory context of the message.</p>
    `,
    (e) => `
      <p>In today's fast-paced messaging culture, the ${e.name} emoji ${e.emoji} serves as a powerful tool for expressing collective celebration and positive reinforcement. It adds an immediate layer of enthusiasm to announcements, making ordinary good news feel extraordinary.</p>
      <p>By incorporating this emoji, senders ensure their excitement is unmistakable, reducing the risk of misinterpretation in short-form communication. It has become a staple for marking milestones and fostering a sense of community joy online.</p>
      <p>The emoji's design elements contribute to its effectiveness in conveying pure, unfiltered celebration.</p>
    `,
    (e) => `
      <p>More than just decoration, the ${e.name} emoji ${e.emoji} embodies the essence of victory, happiness, and communal festivity. It is frequently deployed to acknowledge successes big and small, from personal goals to global events.</p>
      <p>This emoji enhances emotional clarity by visually amplifying the sender's positive intent, which is particularly valuable in nuanced digital exchanges. Its presence transforms neutral text into something uplifting and memorable.</p>
      <p>Users appreciate how it effortlessly injects energy and warmth into conversations centered around positive developments.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} captures the spirit of celebration in its purest form, representing moments of triumph, gratitude, and shared elation. It is a go-to choice for highlighting achievements and spreading positivity across chats and social feeds.</p>
      <p>In an era where tone can be easily lost in text, this emoji acts as a reliable indicator of joy and approval. It encourages engagement by making messages more inviting and emotionally resonant.</p>
      <p>Its widespread use underscores its role in modern communication as a universal symbol of good vibes and festive acknowledgment.</p>
    `
  ]
};
const realLifeUsageBlocks = {
  Celebration: [
    (e) => `
      <p>In everyday scenarios, the ${e.name} emoji ${e.emoji} shines during personal milestones like graduations, weddings, or job promotions, where friends flood messages with it to show support.</p>
      <p>On social media, it's common in posts announcing new babies, engagements, or business launches, amplifying the excitement for wider audiences.</p>
      <p>Workplace chats often feature it when teams hit targets or complete projects, fostering a sense of shared accomplishment even remotely.</p>
      <p>During holidays and birthdays, it pairs perfectly with greetings to make celebrations feel more lively and inclusive.</p>
    `,
    (e) => `
      <p>People frequently use the ${e.name} emoji ${e.emoji} in group chats to react to someone's good news, such as passing an exam or winning an award, creating instant group cheer.</p>
      <p>Sports fans deploy it massively after victories, while event organizers include it in announcements for festivals or parties.</p>
      <p>In family threads, it's a staple for celebrating anniversaries, recoveries from illness, or simple daily wins like a great meal.</p>
      <p>Content creators often add it to captions marking subscriber milestones or successful collaborations.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} appears regularly in professional networking when congratulating colleagues on publications, funding rounds, or career advancements.</p>
      <p>Friends use it liberally for travel achievements, like reaching a dream destination, or personal records in fitness challenges.</p>
      <p>During global events like New Year's or championship wins, social platforms overflow with this emoji as users join collective celebrations.</p>
      <p>It's also popular in fundraising updates when goals are met, signaling gratitude and success to donors.</p>
    `,
    (e) => `
      <p>In real-world digital interactions, the ${e.name} emoji ${e.emoji} is key for marking seasonal festivities, award ceremonies, or community victories.</p>
      <p>Parents might see it in school group chats celebrating student achievements or event successes.</p>
      <p>Gamers use it after tough level completions or tournament wins, while artists share it upon finishing major projects.</p>
      <p>Overall, it thrives in any context where joy is shared publicly or privately to reinforce positive moments.</p>
    `
  ]
};
const toneImpactBlocks = {
  Celebration: [
    (e) => `
      <p>Incorporating the ${e.name} emoji ${e.emoji} dramatically elevates the tone of a message, shifting it from neutral or informative to overtly joyful and enthusiastic.</p>
      <p>It injects infectious energy, making recipients feel included in the celebration and more emotionally connected.</p>
      <p>Even straightforward announcements gain warmth and excitement, encouraging positive responses and continued conversation.</p>
      <p>This emoji ensures that the celebratory intent is unmistakable, preventing any risk of the message feeling flat or understated.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} acts as a tone amplifier, transforming ordinary text into something vibrant and uplifting.</p>
      <p>It conveys genuine excitement and happiness, helping to build rapport and foster a lighter, more engaging atmosphere in chats.</p>
      <p>By signaling pure positivity, it reduces ambiguity and makes the overall emotional impact stronger and more memorable.</p>
      <p>Users often find that adding it creates a ripple effect of good feelings among conversation participants.</p>
    `,
    (e) => `
      <p>Adding the ${e.name} emoji ${e.emoji} instantly brightens the emotional tone, turning potentially dry statements into expressions of delight and triumph.</p>
      <p>It reinforces sincerity in congratulations, making the sender appear more invested and cheerful.</p>
      <p>This visual boost helps maintain high spirits in group discussions and encourages others to match the celebratory energy.</p>
      <p>Overall, it plays a crucial role in shaping digital interactions to feel more human and emotionally rich.</p>
    `,
    (e) => `
      <p>The presence of the ${e.name} emoji ${e.emoji} profoundly influences message tone by layering on unmistakable joy and festivity.</p>
      <p>It softens formal text, adds playfulness to casual exchanges, and ensures positive emotions are front and center.</p>
      <p>Recipients perceive heightened enthusiasm, which can improve mood and strengthen relationships through shared happiness.</p>
      <p>Its impact lies in making communication feel more dynamic and aligned with real-life celebratory expressions.</p>
    `
  ]
};
const professionalVsCasualBlocks = {
  Celebration: [
    (e) => `
      <p>In casual settings among friends or family, the ${e.name} emoji ${e.emoji} is enthusiastically embraced to mark any joyful event without restraint.</p>
      <p>Within relaxed professional environments, such as creative teams or startups, it's often acceptable for celebrating wins like project completions or client approvals.</p>
      <p>However, in strictly formal corporate communication, it may come across as too informal and distract from professionalism.</p>
      <p>Knowing the workplace culture and relationship dynamics helps determine if its upbeat energy fits appropriately.</p>
    `,
    (e) => `
      <p>Casual conversations thrive with the ${e.name} emoji ${e.emoji}, where it freely enhances birthday wishes, personal achievements, or fun announcements.</p>
      <p>In professional contexts with familiar colleagues, it can lighten tone during team successes or informal updates.</p>
      <p>Yet in client-facing emails or executive reports, opting for words over emojis maintains a polished, serious demeanor.</p>
      <p>Balancing its use based on audience expectations ensures it adds value rather than undermining credibility.</p>
    `,
    (e) => `
      <p>The ${e.name} emoji ${e.emoji} fits seamlessly into casual exchanges, amplifying excitement in social chats or personal messages without issue.</p>
      <p>In progressive professional settings, it's increasingly common for acknowledging milestones in internal tools like Slack.</p>
      <p>Traditional or hierarchical workplaces may view it as unprofessional, preferring restrained language for celebrations.</p>
      <p>Contextual awareness allows users to leverage its positivity where it enhances rather than detracts from communication.</p>
    `,
    (e) => `
      <p>Casual use of the ${e.name} emoji ${e.emoji} is unrestricted, perfect for injecting fun into everyday celebrations with peers.</p>
      <p>Professionally, it's best reserved for informal teams where culture supports expressive communication during positive feedback.</p>
      <p>In conservative fields like law or finance, avoiding it in written records preserves formality and clarity.</p>
      <p>Adapting to the environment maximizes its ability to convey joy effectively across different scenarios.</p>
    `
  ]
};
const misuseBlocks = {
  Celebration: [
    (e) => `
      <p>One common misuse of the ${e.name} emoji ${e.emoji} is adding it to messages about serious or tragic events, where it can appear insensitive or tone-deaf.</p>
      <p>During discussions of challenges, failures, or neutral updates, its presence might confuse recipients by implying inappropriate joy.</p>
      <p>Sarcastic contexts can backfire, as the emoji's strong positive connotation often overrides intended irony.</p>
      <p>Always considering the overall emotional context prevents it from undermining the message's true intent.</p>
    `,
    (e) => `
      <p>Overusing the ${e.name} emoji ${e.emoji} in non-celebratory contexts dilutes its impact and can make senders seem insincere or oblivious.</p>
      <p>Placing it in condolence messages or complaints risks offending others by clashing with the somber tone.</p>
      <p>In professional feedback involving criticism, it may soften necessary seriousness inappropriately.</p>
      <p>Mindful application ensures this powerful positive symbol enhances rather than complicates communication.</p>
    `,
    (e) => `
      <p>Applying the ${e.name} emoji ${e.emoji} to ambiguous or mildly positive news can exaggerate emotions unintentionally.</p>
      <p>Using it in heated arguments or apologies might trivialize the situation and escalate misunderstandings.</p>
      <p>Cultural differences can amplify misuse if celebration cues vary across regions.</p>
      <p>Pausing to assess alignment with the message's core feeling avoids potential misinterpretation or awkwardness.</p>
    `,
    (e) => `
      <p>Misplacing the ${e.name} emoji ${e.emoji} in formal announcements or sensitive topics can undermine credibility.</p>
      <p>Combining it with negative text creates mixed signals that confuse rather than clarify intent.</p>
      <p>Habitual overuse in routine messages reduces its special celebratory power over time.</p>
      <p>Strategic restraint preserves its effectiveness for genuine moments of joy and triumph.</p>
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