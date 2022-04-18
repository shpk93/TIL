function solution(board) {
  // 매트릭스를 순회하면서 세로로 2개 가로로 2개연결되어있는곳,바뀌어야할 좌표를 배열에 담는다.

  let arr = [];
  let isVisit = {};
  let answer = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let target = board[i][j];

      if (j < board.length - 1) {
        let right = board[i][j + 1];
        if (target === right) {
          arr.push([i, j + 2]);
          arr.push([i, j - 1]);
        }
      }
      if (i < board.length - 1) {
        let down = board[i + 1][j];
        if (target === down) {
          arr.push([i + 2, j]);
          arr.push([i - 1, j]);
        }
      }
      if (j < board.length - 2) {
        let right = board[i][j + 2];

        if (target === right) {
          arr.push([i, j + 1]);
        }
      }
      if (i < board.length - 2) {
        let down = board[i + 2][j];
        if (target === down) {
          arr.push([i + 1, j]);
        }
      }
    }
  }

  while (arr.length) {
    swap(...arr.pop());
  }
  return answer;
  function swap(y, x) {
    if (x < 0 || x >= board.length || y < 0 || y >= board.length) return;
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];
    for (let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= board.length || ny < 0 || ny >= board.length) {
        continue;
      }

      if (isVisit["" + y + x + ny + nx] && isVisit["" + ny + nx + y + x]) {
        continue;
      }

      [board[y][x], board[ny][nx]] = [board[ny][nx], board[y][x]];

      if (check()) {
        isVisit["" + y + x + ny + nx] = true;
        isVisit["" + ny + nx + y + x] = true;
        answer++;
      }
      [board[y][x], board[ny][nx]] = [board[ny][nx], board[y][x]];
    }
  }

  function check() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        let target = board[i][j];

        if (j < board.length - 2) {
          let right = board[i][j + 1];
          let right2 = board[i][j + 2];
          if (target === right && target === right2) {
            return true;
          }
        }
        if (i < board.length - 2) {
          let down = board[i + 1][j];
          let down2 = board[i + 2][j];
          if (target === down && target === down2) {
            return true;
          }
        }
      }
    }
    return false;
  }
}

solution([
  [1, 1, 4, 3],
  [3, 2, 1, 4],
  [3, 1, 4, 2],
  [2, 1, 3, 3],
]);
