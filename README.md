# NeoPixel (ws2812)

Kaluma library for NeoPixel (ws2812) based on RP2 PIO (Programmable I/O)

This is a library to control NeoPixels (WS2812).

> This supports only RP2-based boards (e.g. Raspberry Pi Pico) because it is based on PIO (Programmable I/O).

# Wiring

Here is a wiring example.

| Raspberry Pi Pico | NeoPixel |
| ----------------- | -------- |
| VBUS              | PWR      |
| GND               | GND      |
| GP0               | IN       |

![wiring](https://github.com/niklauslee/neopixel/blob/main/images/wiring.png?raw=true)

# Install

```sh
npm install https://github.com/niklauslee/neopixel
```

# Usage

```js
const {NeoPixel} = require('neopixel');
const np = new NeoPixel(0, 12); // 12 pixels on GPIO0
np.setPixel(0, np.color(255, 0, 0)); // red on the 1st pixel
np.setPixel(1, np.color(0, 255, 0)); // green on the 2nd pixel
np.show();
```

# API
 
## Class: NeoPixel
 
A class for NeoPixel driver.
 
### new NeoPixel(pin, length, options)

- **`pin`** `<number>` The pin number connected to NeoPixel's input.
- **`length`** `<number>` The number of NeoPixels.
- **`options`** `<object>` Options.
  - **`hz`** `<number>` Frequency for control. Default: `800000` (800KHz).
  - **`sm`** `<number>` Id (0~7) of PIO state machine used to control. Default: `0`.

Create an instance of NeoPixel driver.
 
### np.setPixel(index, color)

- **`index`** `<number>` Index of NeoPixel.
- **`color`** `<number>` Color value (24-bit) to set. You can use `np.color(r, g, b)` to get a color value from RGB.

Set color value to a NeoPixel. You have to call `show()` the color to be shown on NeoPixel.

### np.getPixel(index)

- **`index`** `<number>` Index of NeoPixel.
- **Return** `<number>` Color value (24-bit) of the NeoPixel.

Returns the color value of the NeoPixel.

### np.color(r, g, b)

- **`r`** `<number>` Red value (0~255).
- **`g`** `<number>` Green value (0~255).
- **`b`** `<number>` Blue value (0~255).
- **Returns** `<number>` Color value (24-bit).

Return a color value from RGB values.

### np.clear()

Clear all NeoPixels by setting color to `0`.

### np.show()

Show the color values defined by `setPixel()` on NeoPixels.

# Examples

- `ex_spinning.js` : Circular spinning on NeoPixels by changing colors.

# TODO

- [ ] Assign id for PIO state machine automatically using `StateMachine.getAvailableId()`.
