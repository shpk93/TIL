function solution(grid) {
  grid = grid.map((el) => el.split(""));
  let row = grid[0].length;
  let col = grid.length;
  let combination = [];
  let countBox = { a: 0, b: 0, c: 0 };
  let answer = 0;
  let qCount = 0;

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (grid[i][j] === "?") {
        qCount++;
      } else if (grid[i][j] === "a") {
        countBox["a"]++;
      } else if (grid[i][j] === "b") {
        countBox["b"]++;
      } else if (grid[i][j] === "c") {
        countBox["c"]++;
      }
    }
  }

  getCombi(grid, 0, countBox);

  // [그래프,카운트박스]
  combination.forEach(([matrix, allCountBox]) => {
    let queue = [];
    let isVisit = Array(col)
      .fill(null)
      .map((n) => Array(row).fill(false));

    let targetArr = ["a", "b", "c"];
    let bfsCountBox = { a: 0, b: 0, c: 0 };

    while (targetArr.length) {
      let target = targetArr.shift();
      for (let i = 0; i < col; i++) {
        let boolean = false;
        for (let j = 0; j < row; j++) {
          if (matrix[i][j] === target) {
            bfsCountBox[target]++;
            isVisit[i][j] = true;
            queue.push([i, j, bfsCountBox, target]);
            boolean = true;
            break;
          }
        }
        if (boolean) break;
      }
    }
    while (queue.length) {
      let [startY, startX, bfsCountBox, target] = queue.shift();
      bfs(startY, startX, bfsCountBox, target, isVisit, matrix, queue);
    }

    if (
      bfsCountBox["a"] === allCountBox["a"] &&
      bfsCountBox["b"] === allCountBox["b"] &&
      bfsCountBox["c"] === allCountBox["c"]
    ) {
      answer++;
    }
  });

  function bfs(startY, startX, countBox, target, isVisit, matrix, queue) {
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];

    for (let i = 0; i < dy.length; i++) {
      let nextY = startY + dy[i];
      let nextX = startX + dx[i];
      if (nextX < 0 || nextX >= row || nextY < 0 || nextY >= col) {
        continue;
      }

      if (!isVisit[nextY][nextX] && matrix[nextY][nextX] === target) {
        countBox[target]++;
        isVisit[nextY][nextX] = true;
        queue.push([nextY, nextX, countBox, target]);
      }
    }
  }
  function getCombi(grid, num, countBox) {
    if (num === qCount) {
      combination.push([grid, countBox]);
      return;
    }
    for (let i = 0; i < col; i++) {
      let boolean = false;
      for (let j = 0; j < row; j++) {
        if (grid[i][j] === "?") {
          let copyGrid = grid.map((el) => el.slice());
          let copyGrid2 = grid.map((el) => el.slice());
          let copyGrid3 = grid.map((el) => el.slice());
          copyGrid[i][j] = "a";
          copyGrid2[i][j] = "b";
          copyGrid3[i][j] = "c";
          getCombi(copyGrid, num + 1, { ...countBox, a: countBox["a"] + 1 });
          getCombi(copyGrid2, num + 1, { ...countBox, b: countBox["b"] + 1 });
          getCombi(copyGrid3, num + 1, { ...countBox, c: countBox["c"] + 1 });
          boolean = true;
          break;
        }
      }
      if (boolean) break;
    }
  }
  console.log(answer);
}

solution(["??b", "abc", "cc?"]);
solution(["abcabcab", "????????"]);
solution(["aa?"]);
