// ========== HUMANIZE CODE WITH ANTHROPIC CLAUDE ==========
async function humanizeCode() {
  const input = document.getElementById("input").value.trim();
  const output = document.getElementById("output");
  output.textContent = "⏳ Humanizing code...";

  if (!input) {
    output.textContent = "/* Please paste some code above! */";
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": "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", // <-- Replace with your own real API key
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-sonnet-20240229", // Or another Claude model you have access to
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: "Rewrite the following code to be more human-readable, idiomatic, and well-commented:\n\n" + input
          }
        ]
      })
    });

    if (!response.ok) throw new Error("API error: " + response.status);

    const data = await response.json();
    // Claude API returns an array of content blocks
    output.textContent = data.content[0].text.trim();
  } catch (err) {
    output.textContent = "/* Error: " + err.message + " */";
  }
}

// ========== COPY OUTPUT TO CLIPBOARD ==========
function copyOutput() {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    btn.textContent = "✅ Copied!";
    setTimeout(() => { btn.textContent = "📋 Copy"; }, 1200);
  });
}

// ========== THEME SWITCHING ==========
const themeSelector = document.getElementById("themeSelector");
let isThemeSwitching = false;

themeSelector.addEventListener("change", () => {
  if (isThemeSwitching) return;
  isThemeSwitching = true;
  const newTheme = themeSelector.value;
  showThemePopup(newTheme, () => {
    document.body.className = newTheme;
    updateBgVisuals(newTheme);
    isThemeSwitching = false;
  });
});

window.onload = () => {
  updateBgVisuals(themeSelector.value);
};

// ========== SPLASH SCREEN LOGIC ==========
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('openingSplash');
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 600);
  }, 1700);
});

// ========== BACKGROUND VISUALS ==========
function updateBgVisuals(theme) {
  const bg = document.getElementById("bgVisuals");
  while (bg.firstChild) bg.removeChild(bg.firstChild);

  if (theme === "squid") {
    let html = '';
    const shapes = [
      'circle','triangle','square','circle','triangle','square',
      'circle','triangle','square','circle','triangle','square',
      'circle','triangle','square','circle','triangle','square',
      'circle','triangle','square','circle','triangle','square'
    ];
    for (let i = 1; i <= 24; ++i) {
      if (shapes[i-1] === 'circle') {
        html += `<svg class="squid-shape circle shape${i}" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#ed1b76"/></svg>`;
      } else if (shapes[i-1] === 'triangle') {
        html += `<svg class="squid-shape triangle shape${i}" viewBox="0 0 60 60"><polygon points="30,6 54,54 6,54" fill="#ed1b76"/></svg>`;
      } else {
        html += `<svg class="squid-shape square shape${i}" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="10" fill="#ed1b76"/></svg>`;
      }
    }
    bg.innerHTML = html;
  } else {
    bg.innerHTML = `
      <svg class="bubble bubble1" viewBox="0 0 60 60">
        <ellipse cx="30" cy="30" rx="28" ry="20" fill="#a2c1fa"/>
        <ellipse cx="45" cy="45" rx="6" ry="4" fill="#4666FF" opacity="0.7"/>
      </svg>
      <svg class="bubble bubble2" viewBox="0 0 80 80">
        <ellipse cx="40" cy="40" rx="36" ry="26" fill="#bde0fe"/>
        <ellipse cx="60" cy="65" rx="10" ry="6" fill="#4666FF" opacity="0.6"/>
      </svg>
      <svg class="bubble bubble3" viewBox="0 0 40 40">
        <ellipse cx="20" cy="20" rx="18" ry="12" fill="#fff"/>
        <ellipse cx="30" cy="34" rx="4" ry="2" fill="#4666FF" opacity="0.5"/>
      </svg>
      <svg class="chaticon chaticon1" viewBox="0 0 48 48">
        <rect x="6" y="12" width="36" height="24" rx="12" fill="#4666FF" opacity="0.5"/>
        <ellipse cx="24" cy="36" rx="10" ry="6" fill="#bde0fe"/>
      </svg>
      <svg class="chaticon chaticon2" viewBox="0 0 40 40">
        <ellipse cx="20" cy="18" rx="16" ry="12" fill="#a2c1fa"/>
        <rect x="10" y="24" width="20" height="8" rx="4" fill="#4666FF" opacity="0.7"/>
      </svg>
      <svg class="speech speech1" viewBox="0 0 60 60">
        <ellipse cx="30" cy="28" rx="24" ry="16" fill="#fff"/>
        <ellipse cx="48" cy="44" rx="6" ry="4" fill="#4666FF" opacity="0.5"/>
      </svg>
      <svg class="speech speech2" viewBox="0 0 36 36">
        <ellipse cx="18" cy="14" rx="14" ry="10" fill="#bde0fe"/>
        <rect x="8" y="20" width="20" height="6" rx="3" fill="#4666FF" opacity="0.7"/>
      </svg>
    `;
  }
}

// ========== THEME POPUP (OPTIONAL) ==========
function showThemePopup(theme, onComplete) {
  const popup = document.getElementById("themePopup");
  popup.innerHTML = "";
  popup.style.display = "flex";

  let animationHTML = "";
  let duration = 1200;

  if (theme === "squid") {
    animationHTML = `
      <div style="display:flex; gap:32px;">
        <div style="animation: popIn .7s; background:#249f9c; border-radius:50%; width:64px; height:64px; display:flex; align-items:center; justify-content:center;">
          <svg width="40" height="40"><polygon points="20,6 36,34 4,34" stroke="#fff" stroke-width="4" fill="none"/></svg>
        </div>
        <div style="animation: popIn .9s; background:#ed1b76; border-radius:50%; width:64px; height:64px; display:flex; align-items:center; justify-content:center;">
          <svg width="40" height="40"><circle cx="20" cy="20" r="14" stroke="#fff" stroke-width="4" fill="none"/></svg>
        </div>
        <div style="animation: popIn 1.1s; background:#18171c; border-radius:50%; width:64px; height:64px; display:flex; align-items:center; justify-content:center;">
          <svg width="40" height="40"><rect x="8" y="8" width="24" height="24" stroke="#fff" stroke-width="4" fill="none" rx="5"/></svg>
        </div>
      </div>
      <style>
        @keyframes popIn {
          0% { transform: scale(0.1) translateY(60px); opacity:0;}
          60% { transform: scale(1.1) translateY(-6px); opacity:1;}
          100% { transform: scale(1) translateY(0); opacity:1;}
        }
      </style>
    `;
  } else {
    popup.style.display = "none";
    onComplete();
    return;
  }

  popup.innerHTML = animationHTML;

  setTimeout(() => {
    popup.style.display = "none";
    popup.innerHTML = "";
    onComplete();
  }, duration);
}
