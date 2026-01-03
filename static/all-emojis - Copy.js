const container = document.getElementById("emoji-container");
const toast = document.getElementById("copy-toast");

// Load Unicode emoji JSON
fetch("/data/unicode17-emojis.json")
  .then(res => res.json())
  .then(data => {
    data.groups.forEach(group => {
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
        span.setAttribute("data-name", item.name);

        span.addEventListener("click", (e) => {
          navigator.clipboard.writeText(item.emoji);
          showToast(e.clientX, e.clientY, `Copied ${item.emoji}`);
        });

        grid.appendChild(span);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  })
  .catch(err => {
    console.error("Emoji data load failed:", err);
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
