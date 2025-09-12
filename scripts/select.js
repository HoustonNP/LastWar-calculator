const select = document.getElementById("select");
const buildCalc = document.getElementById("build-calc");
const survivorsCalc = document.getElementById("survivors-calc");

function renderCalculator(value) {
  if (value === "build-option") {
    buildCalc.style.display = "flex";
    survivorsCalc.style.display = "none";
  } else if (value === "survivors-option") {
    buildCalc.style.display = "none";
    survivorsCalc.style.display = "flex";
  }
}

select.addEventListener("change", () => {
  localStorage.setItem("selectedCalculator", select.value);
  renderCalculator(select.value);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("selectedCalculator") || "build-option";
  select.value = saved;
  renderCalculator(saved);
});
