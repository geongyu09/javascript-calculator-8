import { NumberBuffer } from "../src/NumberBuffer";

describe("NumberBuffer 단위테스트", () => {
  let numberBuffer;
  beforeEach(() => {
    numberBuffer = new NumberBuffer();
  });

  describe("isEmpty 메서드", () => {
    it("버퍼가 빈 경우 true를 반환한다", () => {
      expect(numberBuffer.isEmpty()).toBe(true);
    });

    it("버퍼가 비어있지 않은 경우 false를 반환한다.", () => {
      numberBuffer.appendNumber(1);
      expect(numberBuffer.isEmpty()).toBe(false);
    });
  });

  describe("appendNumber 메서드", () => {
    it("0-9 사이의 숫자를 버퍼에 추가할 수 있다", () => {
      expect(() => numberBuffer.appendNumber(5)).not.toThrow();
      expect(numberBuffer.isEmpty()).toBe(false);
    });

    it("여러 숫자를 순서대로 추가할 수 있다", () => {
      numberBuffer.appendNumber(1);
      numberBuffer.appendNumber(2);
      numberBuffer.appendNumber(3);
      expect(numberBuffer.toNumber()).toBe(123);
    });

    it("음수를 받으면 에러를 던진다", () => {
      expect(() => numberBuffer.appendNumber(-1)).toThrow();
    });

    it("9보다 큰 숫자를 받으면 에러를 던진다", () => {
      expect(() => numberBuffer.appendNumber(10)).toThrow();
    });

    it("NaN, Infinite, -Infinite 값을 받으면 에러를 던진다.", () => {
      expect(() => numberBuffer.appendNumber(NaN)).toThrow();
      expect(() => numberBuffer.appendNumber(Infinity)).toThrow();
      expect(() => numberBuffer.appendNumber(-Infinity)).toThrow();
    });

    it("숫자가 아닌 값을 받으면 에러를 던진다", () => {
      expect(() => numberBuffer.appendNumber("1")).toThrow();
      expect(() => numberBuffer.appendNumber(null)).toThrow();
      expect(() => numberBuffer.appendNumber(undefined)).toThrow();
    });
  });
  describe("toNumber 메서드", () => {
    it("빈 버퍼의 경우 0을 반환한다", () => {
      expect(numberBuffer.toNumber()).toBe(0);
    });

    it("단일 숫자의 경우 그 숫자를 반환한다", () => {
      numberBuffer.appendNumber(7);
      expect(numberBuffer.toNumber()).toBe(7);
    });

    it("여러 숫자를 하나의 정수로 결합하여 반환한다", () => {
      numberBuffer.appendNumber(1);
      numberBuffer.appendNumber(2);
      numberBuffer.appendNumber(3);
      expect(numberBuffer.toNumber()).toBe(123);
    });

    it("0으로 시작하는 숫자도 올바르게 처리한다", () => {
      numberBuffer.appendNumber(0);
      numberBuffer.appendNumber(5);
      expect(numberBuffer.toNumber()).toBe(5);
    });
  });
  describe("clear 메서드", () => {
    it("버퍼의 모든 숫자를 제거한다", () => {
      numberBuffer.appendNumber(1);
      numberBuffer.appendNumber(2);

      numberBuffer.clear();

      expect(numberBuffer.isEmpty()).toBe(true);
      expect(numberBuffer.toNumber()).toBe(0);
    });

    it("빈 버퍼에서 실행해도 에러가 발생하지 않는다", () => {
      expect(() => numberBuffer.clear()).not.toThrow();
      expect(numberBuffer.isEmpty()).toBe(true);
    });
  });
});
