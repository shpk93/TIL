var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let n = input[0];
let commands = input.slice(1);

// 정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

// 명령은 총 다섯 가지이다.

// push X: 정수 X를 스택에 넣는 연산이다.
// pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
// size: 스택에 들어있는 정수의 개수를 출력한다.
// empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
// top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.

// 첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 10,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다.
// 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.

//출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.
function solution(n, commands) {
  let stack = [];
  let result = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].length >= 6) {
      let [command, item] = commands[i].split(" ");
      stack.push(+item);
    } else if (commands[i].length === 3) {
      if (commands[i] === "pop") {
        if (stack.length === 0) {
          result.push(-1);
        } else {
          result.push(stack.pop());
        }
      }
      if (commands[i] === "top") {
        let top = stack[stack.length - 1];
        if (top === undefined) {
          result.push(-1);
        } else {
          result.push(top);
        }
      }
    } else if (commands[i].length === 4) {
      result.push(stack.length);
    } else if (commands[i].length === 5) {
      if (stack.length === 0) {
        result.push(1);
      } else {
        result.push(0);
      }
    }
  }
  console.log(result.join("\n"));
}
solution(n, commands);
