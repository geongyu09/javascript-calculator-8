import { NumberBuffer } from "./NumberBuffer";

export class Calculator {
  constructor() {}

  calculate(inputString) {
    // 빈 문자열인 경우
    if (inputString === "") return 0;

    // 커스텀 구분자를 사용하는 경우
    if (inputString.startsWith("//")) {
      const index = inputString.indexOf("\\n");

      if (index === -1)
        throw new Error(
          "[ERROR] 올바르게 커스텀 구분자가 설정되지 않았습니다.\n\\n누락",
        );

      const separator = inputString.slice(2, index);
      const input = inputString.slice(index + 2);

      if (input?.length === 0) return 0;
      const result = input.split(separator).reduce((sum, cur) => +sum + +cur);
      if (Number.isNaN(result))
        throw new Error("[ERROR] 부적절한 문자가 들어갔습니다.");
      return result;
    }

    // 커스텀 구분자를 사용하지 않는 경우
    if (
      inputString.startsWith(":") ||
      inputString.startsWith(",") ||
      !Number.isNaN(parseInt(inputString[0]))
    ) {
      const buffer = new NumberBuffer();
      const arr = []; // TODO: 이름 변경하기

      inputString.split("").forEach((char, index) => {
        if (char === ":" || char === ",") {
          arr.push(buffer.toNumber());
          buffer.clear();
          return;
        }

        try {
          buffer.appendNumber(parseInt(char, 10));
        } catch (e) {
          throw new Error(`[ERROR] 올바르지 않는 문자가 들어있습니다. ${char}`);
        }

        if (index === inputString.length - 1) {
          arr.push(buffer.toNumber());
          buffer.clear();
        }
      });

      const result = arr.reduce((sum, cur) => parseInt(sum) + parseInt(cur));
      return result;
    }

    throw new Error("[ERROR]");
  }
}
