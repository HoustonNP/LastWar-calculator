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
const reducedTimeText = document.getElementById("reduced-time");
const remainingTimeText = document.getElementById("remaining-time");

function calculateTime() {
  const toNumber = (input) => Number(input.value) || 0;

  // общее изначальное время постройки
  const totalInitialTime =
    toNumber(initialSeconds) +
    toNumber(initialMinutes) * 60 +
    toNumber(initialHours) * 3600 +
    toNumber(initialDays) * 86400;

  // длительность одной помощи без бонуса
  const helpDuration =
    toNumber(helpSeconds) +
    toNumber(helpMinutes) * 60 +
    toNumber(helpHours) * 3600;

  // бонус от альянса
  const helpBonus = toNumber(allianceBonusLevel) * 30;

  // итоговая длительность одной помощи
  const helpTime = helpDuration + helpBonus;

  // количество помощи
  const totalHelps = toNumber(totalHelpsInput);

  if (totalInitialTime === 0) {
    reducedTimeText.textContent = "Ups... nothing build!";
    remainingTimeText.textContent = "";
    return;
  }

  if (totalHelps <= 0) {
    reducedTimeText.textContent = "Oh... no one help!";
    remainingTimeText.textContent = "";
    return;
  }

  if (helpDuration > totalInitialTime) {
    reducedTimeText.textContent = "Wow... need one help!";
    remainingTimeText.textContent = "";
    return;
  }

  // цикл применения помощи
  let remainingTime = totalInitialTime;

  for (let i = 0; i < totalHelps; i++) {
    if (remainingTime <= 0) break;

    let step;
    if (helpTime < 60) {
      step = 60;
    } else if (helpTime > remainingTime / 200) {
      step = helpTime;
    } else {
      step = remainingTime / 200;
    }

    remainingTime -= step;
  }

  const totalReduced = totalInitialTime - Math.max(0, remainingTime);
  const finalTime = Math.max(0, remainingTime);

  // форматирование времени в д, чч:мм:сс
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);
    const pad = (n) => String(n).padStart(2, "0");
    return `${days} d, ${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  };

  reducedTimeText.textContent = `Reduced: ${formatTime(totalReduced)}`;
  remainingTimeText.textContent = `Remaining: ${formatTime(finalTime)}`;
}

survivorsBtn.addEventListener("click", calculateTime);
