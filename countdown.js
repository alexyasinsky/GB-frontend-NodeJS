function getDaysInCurrentMonth() {
  const now = new Date();
  const temp = new Date().setMonth(now.getMonth() + 1);
  return Math.floor((temp - now) / 1000 / 60 / 60 / 24);
}

export function getTimeLeft(dateArray) {
  let date = new Date(...dateArray);
  const now = new Date();

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


