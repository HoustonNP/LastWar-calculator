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
  const toNumber = (input) => Number(input.value) || 0;

  const initialTimeSeconds =
    toNumber(initialSecondsInput) +
    toNumber(initialMinutesInput) * 60 +
    toNumber(initialHoursInput) * 3600 +
    toNumber(initialDaysInput) * 86400;

  const realTimeSeconds =
    toNumber(realSecondsInput) +
    toNumber(realMinutesInput) * 60 +
    toNumber(realHoursInput) * 3600 +
    toNumber(realDaysInput) * 86400;

  if (initialTimeSeconds === 0 || realTimeSeconds === 0) {
    resultTime.textContent = "Ups... nothing build!";
    return;
  }

  if (realTimeSeconds > initialTimeSeconds) {
    resultTime.textContent = "Ups... you have a debuff!";
    return;
  }
  
  const bonusValue = Number(bonusInput.value) || 0;

  const currentPercentage = initialTimeSeconds / (realTimeSeconds / 100);
  const resultPercentage = currentPercentage + bonusValue;

  if (!Number.isFinite(resultPercentage) || resultPercentage === 0) {
    resultTime.textContent = "Ups... Jacque Fresco quotes!";
    return;
  }

  const calculatedTimeSeconds = (initialTimeSeconds / resultPercentage) * 100;

  if (!Number.isFinite(calculatedTimeSeconds)) {
    resultTime.textContent = "Ups... Jacque Fresco quotes!";
    return;
  }

  const days = Math.floor(calculatedTimeSeconds / 86400);
  const hours = Math.floor((calculatedTimeSeconds % 86400) / 3600);
  const minutes = Math.floor((calculatedTimeSeconds % 3600) / 60);
  const seconds = Math.round(calculatedTimeSeconds % 60);

  const pad = (n) => String(n).padStart(2, "0");

  resultTime.textContent = `${days} d, ${pad(hours)}:${pad(minutes)}:${pad(
    seconds
  )}`;
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


