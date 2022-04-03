function solution(n, edges, k, a, b) {
  let graph = {};
  for (let i = 0; i < n; i++) {
    graph[i] = [];
  }

  edges.forEach((el) => {
    graph[el[0]].push(el[1]);
    graph[el[1]].push(el[0]);
  });

  let queue = [[a, 0, [a]]];
  let set = new Set();
  set.add(a);
  let bfs = (v, dist, arr) => {
    if (dist > k) return;
    if (v === b) {
      arr.forEach((el) => {
        set.add(el);
      });
      return;
    }
    graph[v].forEach((el) => {
      queue.push([el, dist + 1, [...arr, el]]);
    });
  };

  while (queue.length) {
    bfs(...queue.shift());
  }
  let arr = Array(n)
    .fill(null)
    .map((el, i) => i);

  arr = arr.filter((el) => !set.has(el));
  let answer = edges.filter(
    (el) => !arr.includes(el[0]) && !arr.includes(el[1])
  ).length;

  console.log(answer);
}
solution(
  8,
  [
    [0, 1],
    [1, 2],
    [2, 3],
    [4, 0],
    [5, 1],
    [6, 1],
    [7, 2],
    [7, 3],
    [4, 5],
    [5, 6],
    [6, 7],
  ],
  4,
  0,
  3
);
