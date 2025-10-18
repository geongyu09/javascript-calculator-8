import { Calculator } from '../src/Calculator';

describe('Calculator 단위 테스트', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });
  describe('calculate 메서드', () => {
    describe('정상 입력 처리', () => {
      test('빈 문자열은 0을 반환한다', () => {
        expect(calculator.calculate('')).toBe(0);
      });

      test('단일 숫자는 그대로 반환한다', () => {
        expect(calculator.calculate('5')).toBe(5);
      });

      test('기본 구분자(쉼표)로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('1,2,3')).toBe(6);
      });

      test('기본 구분자(콜론)로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('1:2:3')).toBe(6);
      });

      test('혼합 구분자로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('1,2:3')).toBe(6);
      });

      test('0을 포함한 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('0,1,2')).toBe(3);
      });

      test('커스텀 구분자(세미콜론)로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('//;\\n1;2;3')).toBe(6);
      });

      test('커스텀 구분자(파이프)로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('//|\\n1|2')).toBe(3);
      });

      test('다중 문자 커스텀 구분자로 구분된 숫자들의 합을 반환한다', () => {
        expect(calculator.calculate('//!!\\n5!!2')).toBe(7);
      });

      test('연속된 구분자는 0을 반환한다', () => {
        expect(calculator.calculate(',,')).toBe(0);
      });

      test('커스텀 연속 구분자는 0을 반환한다', () => {
        expect(calculator.calculate('//!!\\n!!')).toBe(0);
      });

      test('구분자로 시작하는 입력의 합을 반환한다', () => {
        expect(calculator.calculate(',1,2')).toBe(3);
      });

      test('구분자로 끝나는 입력의 합을 반환한다', () => {
        expect(calculator.calculate('1,2,')).toBe(3);
      });

      test('콜론으로 시작하고 끝나는 입력의 합을 반환한다', () => {
        expect(calculator.calculate(':1:2:')).toBe(3);
      });

      test('다자리 숫자(기본 구분자)의 합을 반환한다', () => {
        expect(calculator.calculate('123,456')).toBe(579);
      });

      test('다자리 숫자(콜론 구분자)의 합을 반환한다', () => {
        expect(calculator.calculate('1000:2000:3000')).toBe(6000);
      });

      test('다자리 숫자(커스텀 구분자)의 합을 반환한다', () => {
        expect(calculator.calculate('//|\\n9999|1111|8888')).toBe(19998);
      });
    });

    describe('잘못된 입력 처리', () => {
      test('문자로 시작하는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('a1,2')).toThrow('[ERROR]');
      });

      test('공백으로 시작하는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate(' 1,2')).toThrow('[ERROR]');
      });

      test('문자로 끝나는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('1,2a')).toThrow('[ERROR]');
      });

      test('공백으로 끝나는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('1,2 ')).toThrow('[ERROR]');
      });

      test('숫자 사이에 문자가 있는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('1a2')).toThrow('[ERROR]');
      });

      test('공백을 구분자로 사용한 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('1 2')).toThrow('[ERROR]');
      });

      test('잘못된 구분자가 있는 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('1,2#3')).toThrow('[ERROR]');
      });

      test('음수가 포함된 입력시 에러를 발생시킨다 - 첫 번째', () => {
        expect(() => calculator.calculate('-1,2')).toThrow('[ERROR]');
      });

      test('음수가 포함된 입력시 에러를 발생시킨다 - 중간', () => {
        expect(() => calculator.calculate('1,-2')).toThrow('[ERROR]');
      });

      test('커스텀 구분자가 누락된 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('//\\n1,2')).toThrow('[ERROR]');
      });

      test('커스텀 구분자에서 \\n이 누락된 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('//;1;2')).toThrow('[ERROR]');
      });

      test('잘못된 커스텀 구분자 시작 입력시 에러를 발생시킨다', () => {
        expect(() => calculator.calculate('/;/\\n1;2')).toThrow('[ERROR]');
      });
    });
  });
});
