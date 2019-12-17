let arr = [1, 2, 3, '1', '2', '3', 'one', 'two', 'three'];
let sum = 0;

for (num of arr) {
    if (typeof num === 'number') {
        sum += num;
    }
    if (!Number.isNaN(parseInt(num))) {
        sum += parseInt(num);
        console.log(num, Number.isNaN(parseInt(num)));
    }
}
console.log(sum);