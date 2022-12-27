import timezone from "./dbtimezone.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const hh = document.querySelector("#hh");
const mm = document.querySelector("#mm");
const ss = document.querySelector("#ss");
const currentTime = document.querySelector("#current-time");
const currentDate = document.querySelector("#date");
const clockItems = document.querySelectorAll(".home-wrapper .clock-item");
const wrappers = document.querySelectorAll(".wrapper");
const setAlarmWrapper = document.querySelector(
  ".alarm-wrapper .set-alarm-wrapper"
);
const setTimerWrapper = document.querySelector(
  ".timer-wrapper .set-alarm-wrapper"
);
const timerWrapper = document.querySelector(".timer-wrapper ");
const setAlarmBox = document.querySelector(".alarm-wrapper .set-alarm-box");
const setTimerBox = document.querySelector(".timer-wrapper .set-alarm-box");
const addAlarmBtn = document.querySelector(".alarm-wrapper .add-alarm-btn");
const addTimerBtn = document.querySelector(".timer-wrapper .add-alarm-btn");
const listAlarm = document.querySelector(".detail-wrapper .clock-bottom");
const listTimer = document.querySelector(".timer-wrapper .clock-bottom");
const homepageBtns = document.querySelectorAll(".homepage-btn");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".alarm-wrapper .set-alarm-btn");
const setTimerBtn = document.querySelector(".timer-wrapper .set-alarm-btn");
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

  const removeAlarmBtns = document.querySelectorAll(
    ".detail-wrapper .remove-alarm"
  );

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

// =SHOW THE TIME =
let showTime = function () {
  const date = new Date();
  currentTime.textContent = `${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;

  // =Ringing Alarm=
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

// ======================TIMER WRAPPER ====================================================================
let isAvailble = false;
let myIntervel;

addTimerBtn.addEventListener("click", (e) => {
  setTimerWrapper.style.display = "flex";
});

// set timer
setTimerBtn.addEventListener("click", () => {
  let time = `<div class="clock-item"><span class="span"> ${
    parseInt(selectMenu[2].value) < 10
      ? "0" + parseInt(selectMenu[2].value)
      : parseInt(selectMenu[2].value)
  } : ${
    parseInt(selectMenu[3].value) < 10
      ? "0" + parseInt(selectMenu[3].value)
      : parseInt(selectMenu[3].value)
  } </span> 
    <div class="remove-alarm"><img src="./img/trash.svg" alt="" /></div></div>`;

  listTimer.insertAdjacentHTML("beforeend", time);
  setTimerWrapper.style.display = "none";
  addTimerBtn.classList.add("disable");
  $(".pause-alarm-btn").classList.add("disable");
  $(".start-alarm-btn").classList.remove("disable");

  document.querySelector(
    ".timer-wrapper .time-alarm"
  ).innerHTML = `<span >The timer setup will end in <b>${
    parseInt(parseInt(selectMenu[2].value)) * 60 +
    parseInt(parseInt(selectMenu[3].value))
  }</b> minutes </span>`;

  isAvailble = true;

  $(".timer-wrapper .remove-alarm").addEventListener(
    "click",
    handleRemoveTimer
  );
});

//  Pause timer btn
$(".pause-alarm-btn").addEventListener("click", () => {
  if (isAvailble === true) {
    clearInterval(myIntervel);

    $(".pause-alarm-btn").classList.add("disable");
    listTimer.classList.remove("running");
    timerWrapper.classList.remove("run");
    $(".start-alarm-btn").classList.remove("disable");

    $(".timer-wrapper .remove-alarm").addEventListener(
      "click",
      handleRemoveTimer
    );
  }
});

//  remove timer
function handleRemoveTimer() {
  $(".timer-wrapper .clock-item").remove();
  $(".timer-wrapper .start-alarm-btn").classList.add("disable");
  $(".timer-wrapper .start-alarm-btn").classList.add("disable");
  addTimerBtn.classList.remove("disable");
  clearInterval(myIntervel);

  $(
    ".timer-wrapper .time-alarm"
  ).innerHTML = `<span >Please Add The Time </span>`;
}

//  start timer
$(".start-alarm-btn").addEventListener("click", () => {
  if (isAvailble === true) {
    //  start timer countdown
    console.log($(".timer-wrapper .clock-item "));
    let mm = parseInt($(".timer-wrapper .clock-item ").innerText.slice(5, 7));
    let hh = parseInt($(".timer-wrapper .clock-item ").innerText.slice(0, 3));
    function startTimer() {
      mm = mm - 1;

      if (mm > 0 || (mm === 0 && hh > 0)) {
        $(
          ".timer-wrapper .time-alarm"
        ).innerHTML = `<span >The timer setup will end in <b>${
          hh * 60 + mm
        }</b> minutes </span>`;
        $(".timer-wrapper .clock-item ").innerHTML = `<span >${
          hh < 10 ? "0" + hh : hh
        } : ${mm < 10 ? "0" + mm : mm}
      </span> <div class="remove-alarm"><img src="./img/trash.svg" alt="" /></div>`;
      } else if (mm < 0 && hh === 0) {
        mm = 0;
        hh = 0;
      } else if (mm < 0) {
        $(
          ".timer-wrapper .time-alarm"
        ).innerHTML = `<span >The timer setup will end in <b>${
          hh * 60 + mm
        }</b> minutes </span>`;

        $(".timer-wrapper .clock-item ").innerHTML = `<span >${
          hh - 1 < 10 ? "0" + (hh - 1) : hh - 1
        } : ${mm + 60 < 10 ? "0" + (mm + 60) : mm + 60}
      </span> <div class="remove-alarm"><img src="./img/trash.svg" alt="" /></div>`;
        mm = 59;
        hh = hh - 1;
      } else if (hh === 0 && mm === 0) {
        $(
          ".timer-wrapper .time-alarm"
        ).innerHTML = `<span >The timer ended, please setup the new time </span>`;
        addTimerBtn.innerHTML = `<img src="./img/alarm-fill.svg" alt="" />
      Add`;
        listTimer.classList.remove("running");
        timerWrapper.classList.remove("run");
        addTimerBtn.classList.remove("disable");
        $(".timer-wrapper .clock-item").remove();
        $(".pause-alarm-btn").classList.add("disable");

        ringtone.play();
        clearInterval(myIntervel);
        return;
      }
    }

    myIntervel = setInterval(startTimer, 60000);

    $(".start-alarm-btn").classList.add("disable");
    $(".pause-alarm-btn").classList.remove("disable");
    $(".timer-wrapper .remove-alarm").removeEventListener(
      "click",
      handleRemoveTimer
    );
    $(".timer-wrapper").classList.remove("stop");

    listTimer.classList.add("running");
    timerWrapper.classList.add("run");
  }
});

// handle clickOut setTimer
setTimerWrapper.addEventListener("click", (e) => {
  if (!e.target.matches(".set-alarm-box") && !setTimerBox.contains(e.target)) {
    setTimerWrapper.style.display = "none";
  }
});

// ====================================WORLD TIME ZONE================================
const API_KEY = "	C6KZF7GSDYOA";
// render data search box
let data = "";
timezone.forEach((item) => {
  data += `<p class="country-item">
  <img src="./img/search-icon.png" alt="" />${item.name} 
</p>`;
});
$(".list-country").innerHTML =
  data +
  `<p class="country-empty" data-name= 'empty'>
</br></br></br>We haven't data about this country
</p>`;

// search event
$(".world-clock .clock-top input").addEventListener("click", () => {
  $(".list-country").style.display = "block ";
  $(".world-clock .clock-top .clock-top-live").style.display = "none";
});

document.addEventListener("click", (e) => {
  if (
    !$(".list-country").contains(e.target) &&
    !e.target.matches(".world-clock .clock-top input")
  ) {
    $(".list-country").style.display = "none";
    $(".world-clock .clock-top .clock-top-live").style.display = "block";
  }
});

// show-loading
let showLoading = `<div class="loading-skeleton">
<div class="l-title">
  <div class="l l-title-child"></div>
</div>
<div class="l-time">
  <div class="l-date l"></div>
  <div class="l-hour l"></div>
</div>
</div>`;

// fetch data interval
function fetchInterval(lat, lng, name) {
  setInterval(function () {
    fetch(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        // $(".world-clock .clock-item").remove();
        // hideLoading();
        let worldClockItem = `<div class="clock-item">
                <span>${name}</span>
                <p class="time">
                  <span>${data.formatted.slice(0, 10)}</span>
                  <span class="time-style"><b>${data.formatted.slice(
                    11,
                    19
                  )}</b></span>
                </p>
              </div>`;
        $(".world-clock .clock-bottom").innerHTML = worldClockItem;
        $(".list-country").style.display = "none";
        $(".world-clock .clock-top .clock-top-live").style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
  }, 5000);
}

// event show time in item  when click
if (data !== "") {
  $$(".country-item").forEach((item) => {
    item.addEventListener("click", () => {
      $(".world-clock .clock-bottom").innerHTML = showLoading;
      setTimeout(function () {
        timezone.forEach((itemData) => {
          if (item.innerText === itemData.name) {
            fetchInterval(itemData.lat, itemData.lng, itemData.name);
          }
        });
      }, 1000);
    });
  });
}

// search data fetch
$(".world-clock .search-country").addEventListener("click", (e) => {
  e.preventDefault();
  let value = $(".world-clock input").value.toLowerCase().trim();
  console.log(value);
  timezone.forEach((item) => {
    if (value === item.name.toLowerCase().trim()) {
      $(".world-clock .clock-bottom").innerHTML = showLoading;
      fetchInterval(item.lat, item.lng, item.name);
    }
  });
});

// match data item
$(".world-clock input").addEventListener("keyup", () => {
  $$(".country-item").forEach((item) => {
    const value = $(".world-clock input").value.toLowerCase().trim();
    if (item.innerText.toLowerCase().trim().indexOf(value) !== -1) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });

  // show text "haven't data"
  let a = 0;
  $$(".country-item").forEach((item) => {
    if (item.classList.contains("hide")) {
      a++;
    }
    if (a >= [...$$(".country-item")].length) {
      $(".country-empty").style.display = "block";
    } else {
      $(".country-empty").style.display = "none";
    }
  });
});

/* ==============================STOP WATCH================================*/

// count time
const ms = $(".stop-watch .ms");
const sec = $(".stop-watch .sec");

let milisec = 0;
let seccond = 0;
function countTime() {
  milisec++;
  if (milisec === 100) {
    milisec = 0;
    seccond = seccond + 1;
  }

  ms.innerText = milisec < 10 ? "0" + milisec : milisec;
  sec.innerText = seccond < 10 ? "0" + seccond : seccond;
}
+"s";
let stopWatchInterval;
$(".stop-watch .start-alarm-btn").addEventListener("click", () => {
  switch ($(".stop-watch .start-alarm-btn").innerText) {
    case "Start":
      $(".stop-watch .start-alarm-btn").innerText = "Pause";
      stopWatchInterval = setInterval(countTime, 10);
      $(".stop-watch .clock-top-live").classList.add("runWatch");
      break;
    case "Pause":
      $(".stop-watch .start-alarm-btn").innerText = "Start";
      clearInterval(stopWatchInterval);
      $(".stop-watch .clock-top-live").classList.remove("runWatch");

      break;
    default:
  }
});

let getCount = 0;
$(".stop-watch .get-alarm-btn").addEventListener("click", () => {
  getCount += 1;
  console.log(getCount);
  let stopItem = `<div class="clock-item"><span class="number">(${getCount})</span class="number"><p>${sec.innerText}<span class='item' >s</span> : ${ms.innerText}<span class='item' >ms</span></p></div>`;
  $(".stop-watch .clock-bottom").insertAdjacentHTML("beforeend", stopItem);
});

$(".stop-watch .reset-alarm-btn").addEventListener("click", () => {
  ms.innerText = "00";
  sec.innerText = "00";
  clearInterval(stopWatchInterval);
  $(".stop-watch .start-alarm-btn").innerText = "Start";
  $(".stop-watch .clock-bottom").innerHTML = "";
  $(".stop-watch .clock-top-live").classList.remove("runWatch");
  getCount = 0;
  milisec = 0;
  seccond = 0;
});
