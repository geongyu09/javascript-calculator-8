import { Console } from "@woowacourse/mission-utils";
import Calculator from "./Calculator";

class App {
  async run() {
    try {
      const input = await Console.readLineAsync(
        "덧셈할 문자열을 입력해 주세요.\n",
      );

      const calculator = new Calculator();

      const result = calculator.calculate(input);
      Console.print(`결과 : ${result}`);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default App;
