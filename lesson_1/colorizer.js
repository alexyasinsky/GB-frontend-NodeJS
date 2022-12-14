import colors from "colors";

export function colorizeArr(arr, palette) {
  let colorCount = 0;
  for (let i = 0; i<arr.length; i++) {
    let color = palette[colorCount];
    console.log(colors[color](arr[i]));
    colorCount === palette.length - 1 ? colorCount = 0 : colorCount++
  }
}

export function colorizeString(string, color) {
  console.log(colors[color](string));
}