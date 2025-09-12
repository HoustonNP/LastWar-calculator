const toggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

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
