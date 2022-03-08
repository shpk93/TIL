var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);

let matrix = [];

for (let i = 1; i < N + 1; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function solution(N, M, matrix) {
  let cameraPosArr = [];
  // [카메라번호,Y,X]
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] <= 5 && matrix[i][j] > 0) {
        cameraPosArr.push([matrix[i][j], i, j]);
      }
    }
  }

  let copyMatrix = matrix.map((el) => el.slice());

  let stack = [copyMatrix];
  cameraPosArr.forEach(([camera, Y, X]) => {
    let now = [];
    while (stack.length) {
      let copyMatrix = stack.pop();
      if (camera === 1) {
        let newMatrix1 = copyMatrix.map((el) => el.slice());
        let newMatrix2 = copyMatrix.map((el) => el.slice());
        let newMatrix3 = copyMatrix.map((el) => el.slice());
        let newMatrix4 = copyMatrix.map((el) => el.slice());

        drawRaser(1, newMatrix1, Y, X);
        drawRaser(2, newMatrix2, Y, X);
        drawRaser(3, newMatrix3, Y, X);
        drawRaser(4, newMatrix4, Y, X);
        now.push(newMatrix1, newMatrix2, newMatrix3, newMatrix4);
      }
      if (camera === 2) {
        let newMatrix1 = copyMatrix.map((el) => el.slice());
        let newMatrix2 = copyMatrix.map((el) => el.slice());
        drawRaser(1, newMatrix1, Y, X);
        drawRaser(3, newMatrix1, Y, X);
        drawRaser(2, newMatrix2, Y, X);
        drawRaser(4, newMatrix2, Y, X);
        now.push(newMatrix1, newMatrix2);
      }
      if (camera === 3) {
        let newMatrix1 = copyMatrix.map((el) => el.slice());
        let newMatrix2 = copyMatrix.map((el) => el.slice());
        let newMatrix3 = copyMatrix.map((el) => el.slice());
        let newMatrix4 = copyMatrix.map((el) => el.slice());

        drawRaser(1, newMatrix1, Y, X);
        drawRaser(2, newMatrix1, Y, X);
        //
        drawRaser(2, newMatrix2, Y, X);
        drawRaser(3, newMatrix2, Y, X);

        drawRaser(3, newMatrix3, Y, X);
        drawRaser(4, newMatrix3, Y, X);

        drawRaser(1, newMatrix4, Y, X);
        drawRaser(4, newMatrix4, Y, X);
        now.push(newMatrix1, newMatrix2, newMatrix3, newMatrix4);
      }
      if (camera === 4) {
        let newMatrix1 = copyMatrix.map((el) => el.slice());
        let newMatrix2 = copyMatrix.map((el) => el.slice());
        let newMatrix3 = copyMatrix.map((el) => el.slice());
        let newMatrix4 = copyMatrix.map((el) => el.slice());

        drawRaser(1, newMatrix1, Y, X);
        drawRaser(2, newMatrix1, Y, X);
        drawRaser(3, newMatrix1, Y, X);

        //
        drawRaser(2, newMatrix2, Y, X);
        drawRaser(3, newMatrix2, Y, X);
        drawRaser(4, newMatrix2, Y, X);

        drawRaser(3, newMatrix3, Y, X);
        drawRaser(4, newMatrix3, Y, X);
        drawRaser(1, newMatrix3, Y, X);

        drawRaser(4, newMatrix4, Y, X);
        drawRaser(1, newMatrix4, Y, X);
        drawRaser(2, newMatrix4, Y, X);
        now.push(newMatrix1, newMatrix2, newMatrix3, newMatrix4);
      }
      if (camera === 5) {
        let newMatrix1 = copyMatrix.map((el) => el.slice());
        drawRaser(1, newMatrix1, Y, X);
        drawRaser(2, newMatrix1, Y, X);
        drawRaser(3, newMatrix1, Y, X);
        drawRaser(4, newMatrix1, Y, X);
        now.push(newMatrix1);
      }
    }
    stack = now;
  });
  let result = Infinity;
  stack.forEach((el) => {
    result = Math.min(result, getCount(N, M, el));
  });

  console.log(result);
  return result;
}
function drawRaser(arrow, matrix, Y, X) {
  //상동하좌
  //1,2,3,4
  let dy = [-1, 0, 1, 0];
  let dx = [0, 1, 0, -1];

  let i = -1;
  let count = 0;
  if (arrow === 1) i = 0;
  if (arrow === 2) i = 1;
  if (arrow === 3) i = 2;
  if (arrow === 4) i = 3;

  let nextY = Y + dy[i];
  let nextX = X + dx[i];

  while (nextX >= 0 && nextY >= 0 && nextX < M && nextY < N) {
    if (matrix[nextY][nextX] === 6) break;
    if (matrix[nextY][nextX] === 0) {
      matrix[nextY][nextX] = "#";
      count++;
    }
    nextY = nextY + dy[i];
    nextX = nextX + dx[i];
  }
  return count;
}
function getCount(N, M, matrix) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] === 0) {
        count++;
      }
    }
  }
  return count;
}
solution(N, M, matrix);
