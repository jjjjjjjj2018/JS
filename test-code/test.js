
var data = "JOHN0000MICHAEL0009994567";
const dataArr = data.split("0").filter(ele => {
  return ele != "";
});
console.log([dataArr[2].substring(0, 3), '-', dataArr[2].substring(3)].join(''));


