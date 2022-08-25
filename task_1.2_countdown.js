import inquirer from "inquirer";
import {generateTimeLeftObject, toTick} from "./countdown.js";

inquirer
  .prompt([
    {
      name: 'timeAndDate',
      message: 'Enter time and date in format hh-dd-mm-yyyy to start countdown:'
    },
  ])
  .then(answers => {
    const dateArray = answers.timeAndDate.split('-').reverse();
    const timeLeft = generateTimeLeftObject(dateArray);
    console.log(new Date());
    toTick(timeLeft);
  });

