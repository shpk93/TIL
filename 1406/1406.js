var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr); // 개행문자로 입력을 구분한다.

let startStr = input[0];
let M = input[1];
let commands = input.slice(2);

// L	커서를 왼쪽으로 한 칸 옮김 (커서가 문장의 맨 앞이면 무시됨)
// D	커서를 오른쪽으로 한 칸 옮김 (커서가 문장의 맨 뒤이면 무시됨)
// B	커서 왼쪽에 있는 문자를 삭제함 (커서가 문장의 맨 앞이면 무시됨)
// 삭제로 인해 커서는 한 칸 왼쪽으로 이동한 것처럼 나타나지만, 실제로 커서의 오른쪽에 있던 문자는 그대로임
// P $	$라는 문자를 커서 왼쪽에 추가함

function solution(startStr, M, commands) {
  let left = startStr.split("");
  let right = [];

  for (let i = 0; i < M; i++) {
    let command = commands[i];
    if (command === "L") {
      let target = left.pop();
      if (target) right.push(target);
    }
    if (command === "D") {
      let target = right.pop();
      if (target) left.push(target);
    }
    if (command === "B") {
      left.pop();
    }
    if (command.length >= 3) {
      let str = command.split(" ")[1];
      for (let i = 0; i < str.length; i++) {
        left.push(str[i]);
      }
    }
  }
  return [...left, ...right.reverse()].join("");
}

console.log(solution(startStr, M, commands));
