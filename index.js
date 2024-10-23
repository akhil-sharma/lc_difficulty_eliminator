function htmlToNodes(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  return template.content;
}

async function init(current_toggle_value) {
  const toggleHtml = `
    <div class="toggle-container">
      <input
        type="checkbox"
        id="lc_difficulty_eliminate_toggle"
        name="lc_difficulty_eliminate_toggle"/>
      <label for="lc_difficulty_eliminate_toggle">Eliminate</label>
    </div>`;

  const toggleStyle = `
    .toggle-container{
      position: fixed;
      bottom: 0;
      right: 10px;
      width: 100px;
      height: 40px;
      padding-top: 10px;
      padding-left: 7px;
      padding-right: 5px;
      padding-bottom: 10px;
      border-radius: 6px;
      box-shadow: inset 0 2px 1px rgba(0, 0, 0, 0.1);
      background-color: #1e3648;
      overflow: hidden;
      z-index: 100000;
    }`;

  const eliminationStyle = `
      .text-olive, .text-yellow, .text-pink, .text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard {
          display: none;
      }
  `;

  const eliminationStyleSheet = document.createElement("style");
  eliminationStyleSheet.textContent = eliminationStyle;

  if (current_toggle_value === "on") {
    document.head.appendChild(eliminationStyleSheet);
  }

  const toggleElement = htmlToNodes(toggleHtml);
  document.body.appendChild(toggleElement);
  const toggleStyleSheet = document.createElement("style");
  toggleStyleSheet.textContent = toggleStyle;
  document.head.appendChild(toggleStyleSheet);

  const toggleElementButton = document.getElementById(
    "lc_difficulty_eliminate_toggle",
  );
  toggleElementButton.checked = current_toggle_value === "on";
  toggleElementButton.addEventListener("change", function () {
    if (this.checked) {
      browser.storage.local
        .set({ ELIMINATION_TOGGLE_ACTIVE: "on" })
        .then(() => {
          this.setAttribute("value", "on");
          toggleElementButton.checked = true;
          document.head.appendChild(eliminationStyleSheet);
        });
    } else {
      browser.storage.local
        .set({ ELIMINATION_TOGGLE_ACTIVE: "off" })
        .then(() => {
          this.setAttribute("value", "off");
          toggleElementButton.checked = false;
          document.head.removeChild(eliminationStyleSheet);
        });
    }
  });
}

(async () => {
  let state = await browser.storage.local.get("ELIMINATION_TOGGLE_ACTIVE");
  await init(state.ELIMINATION_TOGGLE_ACTIVE || "off");
})();
