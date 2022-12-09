const hh = document.querySelector("#hh");
const mm = document.querySelector("#mm");
const ss = document.querySelector("#ss");
const currentTime = document.querySelector("#current-time");
const currentDate = document.querySelector("#date");

const date = new Date();

let showTime = function () {
  currentTime.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  hh.style.transform = `rotate(${date.getHours() * 30}deg)`;
  mm.style.transform = `rotate(${date.getMinutes() * 6}deg)`;
  ss.style.transform = `rotate(${date.getSeconds() * 6}deg)`;
};

function timeDay() {
  if (date.getDay() == 1) {
    return "Monday";
  } else if (date.getDay() == 2) {
    return "Tuesday";
  } else if (date.getDay() == 3) {
    return "Wednesday";
  } else if (date.getDay() == 4) {
    return "Thursday";
  } else if (date.getDay() == 5) {
    return "Friday";
  } else if (date.getDay() == 6) {
    return "Saturday";
  } else {
    return "Sunday";
  }
}

function timeMonth() {
  if (date.getMonth() == 0) {
    return "January";
  } else if (date.getMonth() == 1) {
    return "February";
  } else if (date.getMonth() == 2) {
    return "March";
  } else if (date.getMonth() == 3) {
    return "April";
  } else if (date.getMonth() == 4) {
    return "May";
  } else if (date.getMonth() == 5) {
    return "June";
  } else if (date.getMonth() == 6) {
    return "July";
  } else if (date.getMonth() == 7) {
    return "August";
  } else if (date.getMonth() == 8) {
    return "September";
  } else if (date.getMonth() == 9) {
    return "October";
  } else if (date.getMonth() == 10) {
    return "November";
  } else {
    return "December";
  }
}
currentDate.textContent = ` ${timeDay()} ${date.getDate()} ${timeMonth()} ${date.getFullYear()}`;

// showTime();
setInterval(showTime(), 1000);
