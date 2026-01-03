const container = document.getElementById("emoji-container");
const toast = document.getElementById("copy-toast");
const searchInput = document.getElementById("emoji-search-input");

let emojiGroups = [];

// Load Unicode emoji JSON
fetch("/data/unicode17-emojis.json")
  .then(res => res.json())
  .then(data => {
    emojiGroups = data.groups;
    renderEmojis(emojiGroups);
  })
  .catch(err => {
    console.error("Emoji data load failed:", err);
  });

// Render emojis
function renderEmojis(groups) {
  container.innerHTML = "";

  groups.forEach(group => {
    const section = document.createElement("section");
    section.className = "emoji-group";

    const heading = document.createElement("h2");
    heading.textContent = group.group;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "emoji-grid";

    group.emojis.forEach(item => {
      const span = document.createElement("span");
      span.className = "emoji-item";
      span.textContent = item.emoji;
      span.setAttribute("data-name", item.name.toLowerCase());

      span.addEventListener("click", (e) => {
        navigator.clipboard.writeText(item.emoji);
        showToast(e.clientX, e.clientY, `Copied ${item.emoji}`);
      });

      grid.appendChild(span);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Search logic
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    renderEmojis(emojiGroups);
    return;
  }

  const filteredGroups = emojiGroups
    .map(group => {
      const matches = group.emojis.filter(e =>
        e.name.toLowerCase().includes(query) ||
        e.emoji.includes(query)
      );
      return matches.length ? { ...group, emojis: matches } : null;
    })
    .filter(Boolean);

  renderEmojis(filteredGroups);
});

// Cursor-position toast
function showToast(x, y, text) {
  toast.textContent = text;
  toast.style.left = (x + 12) + "px";
  toast.style.top = (y + 12) + "px";
  toast.style.opacity = "1";

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
  }, 900);
}
