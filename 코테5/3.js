function solution(t, v) {
  let arr = t.split(" ");

  let hash = {};
  let traverseHash = {};
  let count = false;

  arr.forEach((el, i) => {
    if (el[0] === "{") {
      if (!hash[el]) hash[el] = [];
      hash[el].push(i);
      count = true;
    }
  });

  while (count) {
    count = false;
    let copy = arr.slice();
    let traverse = "";
    for (let el of v) {
      let key = "{" + el[0] + "}";
      if (hash[key] && hash[key].length) {
        traverse += el[1];
        hash[key].forEach((index) => {
          copy[index] = el[1];
          if (el[1][0] === "{") {
            count = true;
            if (!hash[el[1]]) hash[el[1]] = [];
            hash[el[1]].push(index);
          }
        });
        hash[key] = [];
      }
    }

    if (!traverseHash[traverse]) {
      traverseHash[traverse] = arr;
      arr = copy;
    } else {
      arr = traverseHash[traverse];
      break;
    }
  }

  console.log(arr.join(" "));
}

solution("this is {template} {template} is {state}", [
  ["template", "string"],
  ["state", "changed"],
]);

solution("this is {template} {template} is {state}", [
  ["template", "{state}"],
  ["state", "{template}"],
]);
solution("this is {template} {template} is {state}", [
  ["template", "{state}"],
  ["state", "{templates}"],
]);
solution("{a} {b} {c} {d} {i}", [
  ["b", "{c}"],
  ["a", "{b}"],
  ["e", "{f}"],
  ["h", "i"],
  ["d", "{e}"],
  ["f", "{d}"],
  ["c", "d"],
]);
