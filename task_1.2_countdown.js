import inquirer from "inquirer";
import {getTimeLeft} from "./countdown.js";
import {colorizeDate} from "./colorizer.js";

inquirer
  .prompt([
    {
      name: 'timeAndDate',
      message: 'Enter time and date in format hh-dd-mm-yyyy to start countdown:'
    },
  ])
  .then(answers => {
    const dateArray = answers.timeAndDate.split('-').reverse();
    dateArray[1] = +dateArray[1] - 1;
    const timeleft = getTimeLeft(dateArray);
    colorizeDate(timeleft, 'blue');
  });