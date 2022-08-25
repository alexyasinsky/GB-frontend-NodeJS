import  EventEmitter from 'events';
import {colorizeDate} from "./colorizer.js";

export function getDaysInCurrentMonth() {
  const now = new Date();
  const temp = new Date().setMonth(now.getMonth() + 1);
  return Math.floor((temp - now) / 1000 / 60 / 60 / 24);
}

export function generateTimeLeftObject(dateArray) {
  dateArray[1] = +dateArray[1] - 1;
  let date = new Date(...dateArray);
  const now = new Date(2022, 7, 25, 22, 59, 55);

  let years = date.getFullYear() - now.getFullYear();

  let months = date.getMonth() - now.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }

  let days = date.getDate() - now.getDate();
  if (days < 0) {
    if (months === 0) {
      years--;
      months = 11;
    } else {
      months--;
    }
    days += getDaysInCurrentMonth();
  }

  let hours = date.getHours() - now.getHours();
  if (hours < 0) {
    if (days === 0) {
      if (months === 0) {
        years--;
        months = 11;
      } else {
        months--;
      }
      days = getDaysInCurrentMonth() - 1;
    } else {
      days--;
    }
    hours += 24;
  }

  let minutes = 60 - now.getMinutes();
  if (minutes === 60) {
    minutes = 0;
  } else {
    if (hours === 0) {
      if (days === 0) {
        if (months === 0) {
          years--;
          months = 11;
        } else {
          months--;
        }
        days = getDaysInCurrentMonth() - 1;
      } else {
        days--;
      }
      hours = 23;
    } else {
      hours--;
    }
  }

  let seconds = 60-now.getSeconds();
  if (seconds === 60) {
    seconds = 0;
  } else {
    if (minutes === 0) {
      if (hours === 0) {
        if (days === 0) {
          if (months === 0) {
            years--;
            months = 11;
          } else {
            months--;
          }
          days = getDaysInCurrentMonth() - 1;
        } else {
          days--;
        }
        hours = 23;
      } else {
        hours--;
      }
      minutes = 59;
    } else {
      minutes--;
    }
  }
  return {years, months, days, hours, minutes, seconds}
}

const emitter = new EventEmitter();

emitter.on('red', payload => colorizeDate(payload, 'red'));
emitter.on('yellow', payload => colorizeDate(payload, 'yellow'));
emitter.on('green', payload => colorizeDate(payload, 'green'));
emitter.on('blue', payload => colorizeDate(payload, 'blue'));

const palette = ['red', 'yellow', 'green', 'blue'];
let colorCount = 0;

export async function toTick(timeLeft) {
  let color = palette[colorCount];
  emitter.emit(color, timeLeft);
  await new Promise ((resolve)=> setTimeout(() => {
    if (timeLeft.seconds !== 0) {
      timeLeft.seconds--;
    } else {
      timeLeft.seconds = 59;
      if (timeLeft.minutes !== 0) {
        timeLeft.minutes--;
      } else {
        timeLeft.minutes = 59;
        if (timeLeft.hours !== 0) {
          timeLeft.hours--;
        } else {
          timeLeft.hours = 23;
          if (timeLeft.days !== 0) {
            timeLeft.days--;
          } else {
            timeLeft.days = getDaysInCurrentMonth() - 1;
            if (timeLeft.months !== 0) {
              timeLeft.month--;
            } else {
              timeLeft.months = 11;
              if (timeLeft.years !== 0) {
                timeLeft.years--;
              }
            }
          }
        }
      }
    }
    if (timeLeft.seconds + timeLeft.minutes + timeLeft.hours + timeLeft.days + timeLeft.months + timeLeft.years === 0) {
      console.log('time!');
      getBellSound();
      return;
    }
    colorCount === palette.length - 1 ? colorCount = 0 : colorCount++;
    resolve();
  }, 1000));
  await toTick(timeLeft);
}

function getBellSound() {

}
