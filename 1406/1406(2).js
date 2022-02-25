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
  console.log(startStr, M, commands);
  let node = { value: null, next: -1, prev: -1 };

  let valueList = new Array(100000).fill(-1);
  let preList = new Array(100000).fill(-1);
  let nextList = new Array(100000).fill(-1);

  let unUsedIndex = 1;
  let curser = 0;

  function insert(index, value) {
    valueList[unUsedIndex] = value;
    preList[unUsedIndex] = index;
    nextList[unUsedIndex] = nextList[index];
    if (nextList[index] !== -1) preList[nextList[index]] = unUsedIndex;
    nextList[index] = unUsedIndex;

    unUsedIndex++;
  }
  for (let i = 0; i < startStr.length; i++) {
    insert(curser, startStr[i]);
    curser++;
  }

  let fn = (num) => {
    console.log(valueList[num]);
    if (nextList[num] !== -1) fn(nextList[num]);
  };
  fn(nextList[0]);
  //   console.log(preList[2], valueList[2], nextList[2]);
}

console.log(solution(startStr, M, commands));
