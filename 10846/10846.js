var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let n = input[0];
let commands = input.slice(1);

// push X: 정수 X를 큐에 넣는 연산이다.
// pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
// size: 큐에 들어있는 정수의 개수를 출력한다.
// empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
// front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
// back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.

function solution(n, commands) {
  let queue = [];
  let frontIndex = 0;

  let answer = "";
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    if (command === "front") {
      if (queue.length <= frontIndex) {
        answer += "-1\n";
      } else {
        answer += `${queue[frontIndex]}\n`;
      }
    }
    if (command === "pop") {
      if (queue.length === frontIndex) {
        answer += "-1\n";
      } else {
        answer += `${queue[frontIndex]}\n`;
        frontIndex++;
      }
    }
    if (command === "size") {
      answer += `${queue.length - frontIndex}\n`;
    }
    if (command === "empty") {
      if (queue.length - frontIndex > 0) {
        answer += "0\n";
      } else answer += "1\n";
    }
    if (command === "back") {
      if (queue.length - frontIndex > 0) {
        answer += `${queue[queue.length - 1]}\n`;
      } else {
        answer += "-1\n";
      }
    }
    if (command.length >= 6) {
      let X = command.split(" ")[1];
      queue.push(X);
    }
  }
  console.log(answer);
}
solution(n, commands);
