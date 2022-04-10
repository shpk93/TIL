function solution(s) {
  let a = [];
  let max = 0;
  let set = new Set();
  for (let i = 0; i < s.length; i++) {
    for (let j = 1; j <= s.length / 2 && i + j < s.length; j++) {
      set.add(s.slice(i, i + j).toLowerCase());
    }
  }

  set.forEach((str) => {
    let regex = new RegExp(str, "gi");
    let next = s.match(regex);

    if (max < next.length) {
      max = next.length;
      a = [str];
    } else if (max === next.length) {
      a.push(str);
    }
  });

  a.forEach((str) => {
    let regex = new RegExp(str, "gi");
    s = s.replace(regex, "");
  });
  console.log(s);
}

solution("abcabcdefabc");
solution("abxdeydeabz");
solution("abcabca");
solution("ABCabcA");

let c = 0;
let j = "b";
while (c !== 1000) {
  c++;
  j += "C";
}

let d = new Date();

solution(j);
let d2 = new Date();

console.log(d2 - d + "ms");
