let arr = [[1, 2], [3, 4, 5], [6, 7, 8, 9]];
let newArr = arr.reduce((prev, curr) => prev.concat(curr));
console.log(newArr);