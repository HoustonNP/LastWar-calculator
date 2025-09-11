// Inputs
const initialDaysInput = document.getElementById("initial-days-input");
const initialHoursInput = document.getElementById("initial-hours-input");
const initialMinutesInput = document.getElementById("initial-minutes-input");
const initialSecondsInput = document.getElementById("initial-seconds-input");

const realDaysInput = document.getElementById("real-days-input");
const realHoursInput = document.getElementById("real-hours-input");
const realMinutesInput = document.getElementById("real-minutes-input");
const realSecondsInput = document.getElementById("real-seconds-input");

const bonusInput = document.getElementById("bonus-input");

// UI
const calculateBtn = document.getElementById("calculate-btn");
const resultTime = document.getElementById("result-time");
const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

function calculateTime() {
  const initialTimeSeconds =
    +initialSecondsInput.value +
    +initialMinutesInput.value * 60 +
    +initialHoursInput.value * 3600 +
    +initialDaysInput.value * 86400;

  const realTimeSeconds =
    +realSecondsInput.value +
    +realMinutesInput.value * 60 +
    +realHoursInput.value * 3600 +
    +realDaysInput.value * 86400;

  const currentPercentage = initialTimeSeconds / (realTimeSeconds / 100);
  const resultPercentage = currentPercentage + +bonusInput.value;
  const calculatedTimeSeconds = (initialTimeSeconds / resultPercentage) * 100;

  const days = Math.floor(calculatedTimeSeconds / 86400);
  const hours = Math.floor((calculatedTimeSeconds % 86400) / 3600);
  const minutes = Math.floor((calculatedTimeSeconds % 3600) / 60);
  const seconds = Math.round(calculatedTimeSeconds % 60);

  resultTime.textContent =
    `${days} d, ` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

calculateBtn.addEventListener("click", calculateTime);

// === Тема ===
function setThemeIcon(isLight) {
  themeIcon.src = isLight ? "icons/sun.svg" : "icons/moon.svg";
  themeIcon.alt = isLight ? "Sun icon" : "Moon icon";
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  const isLight = savedTheme === "light";
  document.body.classList.toggle("light-theme", isLight);
  setThemeIcon(isLight);
} else {
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  if (prefersLight) {
    document.body.classList.add("light-theme");
  }
  setThemeIcon(prefersLight);
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  setThemeIcon(isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
