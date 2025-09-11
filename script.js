const initialTimeForm = document.getElementById("initial-time-form");
const initialDay = document.getElementById("initial-day");
const initialHour = document.getElementById("initial-hour");
const initialMin = document.getElementById("initial-min");
const initialSec = document.getElementById("initial-sec");

const realTimeForm = document.getElementById("real-time-form");
const realDay = document.getElementById("real-day");
const realHour = document.getElementById("real-hour");
const realMin = document.getElementById("real-min");
const realSec = document.getElementById("real-sec");

const bonusForm = document.getElementById("bonus-form");
const bonus = document.getElementById("bonus");

const startBtn = document.getElementById("start");

const resultTime = document.getElementById("result-time");

function myFunction() {
  let initialTime =
    +initialSec.value +
    +initialMin.value * 60 +
    +initialHour.value * 60 * 60 +
    +initialDay.value * 60 * 60 * 24;

  let realTime =
    +realSec.value +
    +realMin.value * 60 +
    +realHour.value * 60 * 60 +
    +realDay.value * 60 * 60 * 24;

  let currentProcentage = +initialTime / (+realTime / 100);

  let resultProcentage = +currentProcentage + +bonus.value;

  let time = (+initialTime / +resultProcentage) * 100;

  const day = Math.floor(time / 86400);
  const hour = Math.floor((time % 86400) / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = Math.round(time % 60);

  resultTime.textContent =
    day + " day, " + hour + " h, " + min + " min, " + sec + " sec.";
}
