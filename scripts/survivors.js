const initialDays = document.getElementById("initial-days-build");
const initialHours = document.getElementById("initial-hours-build");
const initialMinutes = document.getElementById("initial-minutes-build");
const initialSeconds = document.getElementById("initial-seconds-build");

const allianceBonusLevel = document.getElementById("big-help");
const totalHelpsInput = document.getElementById("count-of-help");

const helpHours = document.getElementById("help-hours");
const helpMinutes = document.getElementById("help-minutes");
const helpSeconds = document.getElementById("help-seconds");

const survivorsBtn = document.getElementById("survivors-btn");
const maxBuidTimeText = document.getElementById("max-buid-time");
const reducedTimeText = document.getElementById("reduced-time");
const remainingTimeText = document.getElementById("remaining-time");

const toNumber = (input) => Number(input.value) || 0;

// форматирование времени в д, чч:мм:сс
const formatTime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);
  const pad = (n) => String(n).padStart(2, "0");
  return `${days} d, ${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

function calculateTime() {
  // общее изначальное время постройки
  const totalInitialTime =
    toNumber(initialSeconds) +
    toNumber(initialMinutes) * 60 +
    toNumber(initialHours) * 3600 +
    toNumber(initialDays) * 86400;

  if (totalInitialTime < 0) {
    maxBuidTimeText.textContent = "Ups... Jacque Fresco quotes!";
    reducedTimeText.style.display = "none";
    remainingTimeText.style.display = "none";
    return;
  }

  // длительность одной помощи без бонуса
  const helpDuration =
    toNumber(helpSeconds) +
    toNumber(helpMinutes) * 60 +
    toNumber(helpHours) * 3600;

  if (helpDuration <= 0) {
    maxBuidTimeText.textContent = "Ups... Jacque Fresco quotes!";
    reducedTimeText.style.display = "none";
    remainingTimeText.style.display = "none";
    return;
  }

  // бонус от альянса
  const helpBonus = toNumber(allianceBonusLevel) * 30 + 60;

  if (helpBonus <= 0) {
    maxBuidTimeText.textContent = "You need change alliance!";
    reducedTimeText.style.display = "none";
    remainingTimeText.style.display = "none";
    return;
  }

  // итоговая длительность одной помощи
  const helpTime = helpDuration + helpBonus;

  // количество помощи
  const totalHelps = toNumber(totalHelpsInput);

  if (totalHelps <= 0) {
    maxBuidTimeText.textContent = "Oh... no one help!";
    reducedTimeText.style.display = "none";
    remainingTimeText.style.display = "none";
    return;
  }

  if (totalInitialTime === 0) {
    const Tmax = calculateMaxBuildTime(helpTime, totalHelps);
    if (Tmax > 0) {
      maxBuidTimeText.textContent = `Max build time: ${formatTime(Tmax)}`;
    }
    reducedTimeText.style.display = "none";
    remainingTimeText.style.display = "none";
    return;
  }

  if (totalInitialTime >= 0) {
    const Tmax = calculateMaxBuildTime(helpTime, totalHelps);
    if (Tmax > 0) {
      maxBuidTimeText.textContent = `Max build time: ${formatTime(Tmax)}`;
    }
    const time = calculateHelpTime(totalInitialTime, totalHelps, helpTime);
    reducedTimeText.style.display = "flex";
    remainingTimeText.style.display = "flex";
    reducedTimeText.textContent = `Reduced: ${formatTime(time.totalReduced)}`;
    remainingTimeText.textContent = `Remaining: ${formatTime(time.finalTime)}`;
    return;
  }
}

function calculateMaxBuildTime(helpTime, totalHelps) {
  return (200 * helpTime) / Math.pow(0.995, totalHelps - 1);
}

function calculateHelpTime(totalInitialTime, totalHelps, helpTime) {
  let remainingTime = totalInitialTime;

  for (let i = 0; i < totalHelps; i++) {
    if (remainingTime <= 0) break;

    let step;
    if (helpTime < 60) {
      step = 60;
    } else if (helpTime > remainingTime / 200) {
      step = helpTime;
    } else if (helpTime <= remainingTime / 200) {
      step = remainingTime / 200;
    }

    remainingTime -= step;
  }

  const totalReduced = totalInitialTime - Math.max(0, remainingTime);
  const finalTime = Math.max(0, remainingTime);
  return { totalReduced, finalTime };
}

survivorsBtn.addEventListener("click", calculateTime);
