export {};
const data = "JOHN0000MICHAEL0009994567";
const dataArr = data.split("0").filter(ele => {
  return ele != "";
});
const firstName = dataArr[0];
const lastName = dataArr[1];
const id = dataArr[2];
console.log(firstName, lastName, id);
