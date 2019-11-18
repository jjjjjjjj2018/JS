/*
const peopleArray = [
    { id: 123, name: "dave", age: 23 },
    { id: 456, name: "chris", age: 23 },
    { id: 789, name: "bob", age: 23 },
    { id: 101, name: "tom", age: 23 },
    { id: 102, name: "tim", age: 23 }
];

const peopleObject = peopleArray.reduce((obj, item) => {
    console.log(obj);
    obj[item.id] = item;
    return obj;
}, {});

console.log(peopleObject)
*/

/*const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
const count = (arr) => {
    let objArr = {};
    for (let i = 0; i < arr.length; i++) {
        if (objArr[arr[i]] == undefined) {
            objArr[arr[i]] = 1;
        } else {
            objArr[arr[i]]++;
        }
    }
    return objArr;
}
console.log(count(arr));
*/

/*
let large = '92058702985729308209385209938';
const small = '109';
let sub = '';
for (let i = small.length; i < large.length - small.length; i++) {
    if (large.charAt(large.length - i) != '9') {
        sub = large.substr(large.length - i);
        large = large.substr(0, large.length - i);
        break;
    }
}
let num = parseInt(sub) + parseInt(small);
large = large + num.toString();
console.log(large);
*/

/*
const arr = [[1, 2, 3], [], [], [4, 5], [], [6, 7, 8]];
Array.prototype.next = function () {
    if (typeof newArr == 'undefined')
        newArr = Array.from(arr);

    if (Array.isArray(newArr[0]))
        this.next();
    console.log(newArr.shift());
}
arr.next();
arr.next();
arr.next();
arr.next();
arr.next();
console.log(arr);
*/

/* flat nested array
const arr = [[10, [18, 45, 79]], 20, [30, 33], 40];
const flatten = arr => {
    return arr.reduce((acc, cur) => {
      return !Array.isArray(cur) ? [...acc, cur] : [...acc, ...flatten(cur)];
    }, []);
   };
   
console.log(flatten(arr));
*/

/* limit function time call
function fnLimiter(limit, callback) {
	count = 0;
  return function(a,b){
		if (count >= limit){
  		console.log('max reached');
  		return;
  	}
		count++;
  	return callback(...params);
  }
}
const fn = fnLimiter(3, (a,b) => a * b);
fn(2,5);
fn(5,3);
fn(4,5);
fn(2,7);
*/

/*
function twoSum(arr, S) {
  var sums = [];
  var hashTable = {};
  for (var i = 0; i < arr.length; i++) {
    var sumMinusElement = S - arr[i];
    if (hashTable[sumMinusElement.toString()] !== undefined) {
      sums.push([arr[i], sumMinusElement]);
    }
    hashTable[arr[i].toString()] = arr[i];
  }
  return sums;
}

console.log(twoSum([3, 5, 2, -4, 8, 11], 7).toString());
*/ 