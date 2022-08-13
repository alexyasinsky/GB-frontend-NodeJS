import colors from 'colors';

export function printColorMessageToConsole(color, message) {
  return console.log(colors[color](message));
}
