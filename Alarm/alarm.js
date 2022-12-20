const hh = document.querySelector("#hh");
const mm = document.querySelector("#mm");
const ss = document.querySelector("#ss");
const currentTime = document.querySelector("#current-time");
const currentDate = document.querySelector("#date");
const clockItems = document.querySelectorAll(".home-wrapper .clock-item");
const wrappers = document.querySelectorAll(".wrapper");
const setAlarmWrapper = document.querySelector(".set-alarm-wrapper");
const setAlarmBox = document.querySelector(".set-alarm-box");
const addAlarmBtn = document.querySelector(".add-alarm-btn");
const listAlarm = document.querySelector(".detail-wrapper .clock-bottom");
const homepageBtns = document.querySelectorAll(".homepage-btn");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".set-alarm-btn");

let ringtone = new Audio("./sound/ringtone.mp3");

// ===============NAVIGATE TO FEATURE ===================
homepageBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    wrappers.forEach((wrapper) => {
      wrapper.style.display = "none";
      wrappers[0].style.display = "block";
    });
  });
});

clockItems.forEach((item) => {
  item.addEventListener("click", () => {
    wrappers.forEach((wrapper) => {
      wrapper.style.display = "none";
      if (item.dataset.name === wrapper.dataset.name) {
        wrapper.style.display = "block";
      }
    });
  });
});

// ============= SET ALARM WRAPPER ===============
for (let i = 0; i < 24; i++) {
  let option = `<option value="${i < 10 ? "0" + i : i}">${
    i < 10 ? "0" + i : i
  }</option>`;
  selectMenu[0].insertAdjacentHTML("beforeend", option);
  selectMenu[2].insertAdjacentHTML("beforeend", option);
}
for (let i = 0; i < 60; i++) {
  let option = `<option value="${i < 10 ? "0" + i : i}">${
    i < 10 ? "0" + i : i
  }</option>`;
  selectMenu[1].insertAdjacentHTML("beforeend", option);
  selectMenu[3].insertAdjacentHTML("beforeend", option);
}

addAlarmBtn.addEventListener("click", () => {
  setAlarmWrapper.style.display = "flex";
});

setAlarmWrapper.addEventListener("click", (e) => {
  if (!e.target.matches(".set-alarm-box") && !setAlarmBox.contains(e.target)) {
    setAlarmWrapper.style.display = "none";
  }
});

setAlarmBtn.addEventListener("click", () => {
  let time = `<div class="clock-item"><span> ${selectMenu[0].value}:${selectMenu[1].value} </span> 
  <div class="remove-alarm"><img src="./img/trash.svg" alt="" /></div></div>`;

  document
    .querySelectorAll(".detail-wrapper .clock-item span")
    .forEach((item) => {
      if (
        `${item.innerText}` === `${selectMenu[0].value}:${selectMenu[1].value}`
      ) {
        alert("Báo thức này bạn đã đặt rồi!! Vui lòng chọn khung giờ khác ");
        item.parentNode.remove();
        setAlarmWrapper.style.display = "block";
      }
    });
  listAlarm.insertAdjacentHTML("beforeend", time);
  setAlarmWrapper.style.display = "none";

  const removeAlarmBtns = document.querySelectorAll(".remove-alarm");

  removeAlarmBtns.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.remove();
    });
  });

  document.querySelector(
    ".time-alarm"
  ).innerHTML = `<span>This alarm will ring in <b>${
    selectMenu[0].value - new Date().getHours() < 0
      ? selectMenu[0].value - new Date().getHours() + 24
      : selectMenu[0].value - new Date().getHours()
  }</b> hour <b>${
    selectMenu[1].value - new Date().getMinutes() < 0
      ? selectMenu[1].value - new Date().getMinutes() + 60
      : selectMenu[1].value - new Date().getMinutes()
  }</b> minutes </span>`;

  setTimeout(function () {
    document.querySelector(".time-alarm").innerText = "";
  }, 3000);
});

// =================== SHOW THE TIME ===================
let showTime = function () {
  const date = new Date();
  currentTime.textContent = `${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;

  // ========Ringing Alarm=================
  const listAlarmItem = document.querySelectorAll(
    ".detail-wrapper .clock-item span"
  );
  listAlarmItem.forEach((item) => {
    if (`${item.innerText}:00` === currentTime.textContent) {
      ringtone.play();
      item.parentNode.remove();
    }
  });

  hh.style.transform = `rotate(${date.getHours() * 30}deg)`;
  mm.style.transform = `rotate(${date.getMinutes() * 6}deg)`;
  ss.style.transform = `rotate(${date.getSeconds() * 6}deg)`;

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
};

setInterval(function () {
  showTime();
}, 1000);
