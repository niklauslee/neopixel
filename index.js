const { PIO, ASM, StateMachine } = require("rp2");

class NeoPixel {
  constructor(pin, len, options = {}) {
    this.pin = pin;
    this.length = len;
    this.smId = options.sm ?? StateMachine.getAvailableId();
    this.hz = options.hz || 800000;
    this.buf = new Uint32Array(this.length);
    this.buf.fill(0);

    const asm = new ASM({ sideset: 1 });
    asm
      .label("bitloop")
      .out("x", 1)
      .side(0)
      .delay(2)
      .jmp("!x", "do_zero")
      .side(1)
      .delay(1)
      .label("do_one")
      .jmp("bitloop")
      .side(1)
      .delay(4)
      .label("do_zero")
      .nop()
      .side(0)
      .delay(4);

    this.sm = new StateMachine(this.smId, asm, {
      freq: this.hz * 10,
      autopull: true,
      pullThreshold: 24,
      fifoJoin: PIO.FIFO_JOIN_TX,
      sidesetBase: this.pin,
      outShiftDir: PIO.SHIFT_LEFT,
    });
    this.sm.active(true);
  }

  color(r, g, b) {
    return (g << 24) | (r << 16) | (b << 8);
  }

  setPixel(index, color) {
    this.buf[index] = color;
  }

  getPixel(index) {
    return this.buf[index];
  }

  clear() {
    this.buf.fill(0);
  }

  show() {
    this.sm.put(this.buf);
  }
}

exports.NeoPixel = NeoPixel;
