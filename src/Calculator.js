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
  }
}
