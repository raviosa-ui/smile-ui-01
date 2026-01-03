const fs = require("fs");
const path = require("path");

// Absolute paths (important on Windows)
const ROOT_DIR = path.resolve(__dirname, "..");
const INPUT_FILE = path.join(ROOT_DIR, "scripts", "emoji-test.txt");
const DATA_DIR = path.join(ROOT_DIR, "data");
const OUTPUT_FILE = path.join(DATA_DIR, "unicode17-emojis.json");

// 1️⃣ Read emoji-test.txt
const lines = fs.readFileSync(INPUT_FILE, "utf8").split("\n");

// 2️⃣ Prepare output structure
const output = {
  unicode_version: "17.0",
  last_updated: new Date().toISOString().split("T")[0],
  groups: []
};

let currentGroup = null;

// 3️⃣ Parse file
for (const line of lines) {
  if (line.startsWith("# group:")) {
    currentGroup = {
      group: line.replace("# group:", "").trim(),
      emojis: []
    };
    output.groups.push(currentGroup);
    continue;
  }

  if (!line || line.startsWith("#")) continue;

  const parts = line.split("#");
  if (parts.length < 2) continue;

  const right = parts[1].trim();
  const emoji = right.split(" ")[0];
  const name = right
    .replace(emoji, "")
    .replace(/E[0-9.]+/g, "")
    .trim();

  if (currentGroup) {
    currentGroup.emojis.push({
      emoji,
      name,
      version: "17.0"
    });
  }
}

// 4️⃣ ENSURE data/ folder exists (THIS FIXES YOUR ERROR)
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 5️⃣ Write JSON file
fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(output, null, 2),
  "utf8"
);

console.log("✅ unicode17-emojis.json created at:");
console.log(OUTPUT_FILE);
