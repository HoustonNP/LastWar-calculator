const initialDaysInput = document.getElementById("initial-days-input");
const initialHoursInput = document.getElementById("initial-hours-input");
const initialMinutesInput = document.getElementById("initial-minutes-input");
const initialSecondsInput = document.getElementById("initial-seconds-input");

const realDaysInput = document.getElementById("real-days-input");
const realHoursInput = document.getElementById("real-hours-input");
const realMinutesInput = document.getElementById("real-minutes-input");
const realSecondsInput = document.getElementById("real-seconds-input");

const bonusInput = document.getElementById("bonus-input");

const calculateBtn = document.getElementById("build-btn");
const resultTimeText = document.getElementById("result-time");

resultTimeText.style.display = "none";

const toNumber = (input) => Number(input.value) || 0;

const formatTime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return `${days} d, ${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

function calculateTime() {
  resultTimeText.style.display = "flex";
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
    resultTimeText.textContent = "Ups... nothing build!";
    return;
  }

  if (realTimeSeconds > initialTimeSeconds) {
    resultTimeText.textContent = "Ups... you have a debuff!";
    return;
  }

  const bonusValue = toNumber(bonusInput);

  const currentPercentage = initialTimeSeconds / (realTimeSeconds / 100);
  const resultPercentage = currentPercentage + bonusValue;

  if (!Number.isFinite(resultPercentage) || resultPercentage === 0) {
    resultTimeText.textContent = "Ups... Jacque Fresco quotes!";
    return;
  }

  const calculatedTimeSeconds = (initialTimeSeconds / resultPercentage) * 100;

  if (!Number.isFinite(calculatedTimeSeconds)) {
    resultTimeText.textContent = "Ups... Jacque Fresco quotes!";
    return;
  }

  resultTimeText.textContent = formatTime(calculatedTimeSeconds);
}

calculateBtn.addEventListener("click", calculateTime);
