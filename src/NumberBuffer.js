class NumberBuffer {
  #digits = [];

  isEmpty() {
    return this.#digits.length === 0;
  }

  appendNumber(nbr) {
    if (typeof nbr !== "number" || nbr < 0 || nbr > 9 || Number.isNaN(nbr))
      throw new Error("올바른 인자가 아닙니다");
    this.#digits.push(nbr);
  }

  toNumber() {
    if (this.isEmpty()) return 0;
    return parseInt(this.#digits.map(String).join(""), 10);
  }

  clear() {
    this.#digits = [];
  }
}

export default NumberBuffer;
