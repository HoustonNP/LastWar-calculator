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
const allianceHelpsText = document.getElementById("alliance-helps");
const survivorsHelpsText = document.getElementById("survivors-helps");
const remainingTimeText = document.getElementById("remaining-time");

function calculateTime() {
  const totalInitialTime =
    toNumber(initialSeconds) +
    toNumber(initialMinutes) * 60 +
    toNumber(initialHours) * 3600 +
    toNumber(initialDays) * 86400;

  if (totalInitialTime <= 0) {
    reducedTimeText.style.display = "Ups... Jacque Fresco quotes!";
    remainingTimeText.style.display = "none";
    allianceHelpsTextHelpsText.style.display = "none";
    survivorsHelpsText.style.display = "none";
    return;
  }

  const helpDuration =
    toNumber(helpSeconds) +
    toNumber(helpMinutes) * 60 +
    toNumber(helpHours) * 3600;

  if (helpDuration <= 0) {
    reducedTimeText.style.display = "Ups... Jacque Fresco quotes!";
    remainingTimeText.style.display = "none";
    allianceHelpsTextHelpsText.style.display = "none";
    survivorsHelpsText.style.display = "none";
    return;
  }

  const helpBonus = toNumber(allianceBonusLevel) * 30 + 60;

  if (helpBonus <= 0) {
    reducedTimeText.style.display = "You need change alliance!";
    remainingTimeText.style.display = "none";
    allianceHelpsTextHelpsText.style.display = "none";
    survivorsHelpsText.style.display = "none";
    return;
  }

  const helpTime = helpDuration + helpBonus;

  const totalHelps = toNumber(totalHelpsInput);

  if (totalHelps <= 0) {
    reducedTimeText.style.display = "Oh... no one help!";
    remainingTimeText.style.display = "none";
    allianceHelpsTextHelpsText.style.display = "none";
    survivorsHelpsText.style.display = "none";
    return;
  }

  if (totalInitialTime > 0) {
    const time = calculateHelpTime(totalInitialTime, totalHelps, helpTime);
    reducedTimeText.style.display = "flex";
    remainingTimeText.style.display = "flex";
    allianceHelpsText.style.display = "flex";
    survivorsHelpsText.style.display = "flex";
    reducedTimeText.textContent = `Reduced: ${formatTime(time.totalReduced)}`;
    allianceHelpsText.textContent = `Alliance Helps: ${time.allianceHelps}`;
    survivorsHelpsText.textContent = `Survivors Helps: ${time.survivorsHelps}`;
    remainingTimeText.textContent = `Remaining: ${formatTime(time.finalTime)}`;
    return;
  }
}

function calculateHelpTime(totalInitialTime, totalHelps, helpTime) {
  let remainingTime = totalInitialTime;
  let allianceHelps = 0;
  let survivorsHelps = 0;

  for (let i = 0; i < totalHelps; i++) {
    if (remainingTime <= 0) break;

    let step;

    if (helpTime < 60) {
      step = 60;
    } else if (helpTime > remainingTime / 200) {
      survivorsHelps++;
      step = helpTime;
    } else if (helpTime <= remainingTime / 200) {
      allianceHelps++;
      step = remainingTime / 200;
    }

    remainingTime -= step;
  }

  const totalReduced = totalInitialTime - Math.max(0, remainingTime);
  const finalTime = Math.max(0, remainingTime);

  return { totalReduced, finalTime, allianceHelps, survivorsHelps };
}

survivorsBtn.addEventListener("click", calculateTime);
