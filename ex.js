// example: spining

const { NeoPixel } = require("./index");

const PIN = 0; // GP0
const LENGTH = 12;

const np = new NeoPixel(PIN, LENGTH);
const colors = [
  np.color(0xff, 0, 0), // red
  np.color(0, 0xff, 0), // green
  np.color(0, 0, 0xff), // blue
  np.color(0xff, 0xff, 0), // yellow
  np.color(0xff, 0, 0xff), // magenta
  np.color(0, 0xff, 0xff), // cyan
  np.color(0xff, 0xff, 0xff), // white
];

let p = 0;
let c = 0;
let time = 30; // millisecond

setInterval(() => {
  if (p === np.length) {
    p = 0;
    c++;
    if (c === colors.length) c = 0;
  }
  np.clear();
  np.setPixel(p, colors[c]);
  np.show();
  p++;
}, time);
