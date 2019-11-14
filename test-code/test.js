
const arr = [[10, [18, 45, 79]], 20, [30, 33], 40];

const flatten = arr => {
    return arr.reduce((acc, cur) => {
      return !Array.isArray(cur) ? [...acc, cur] : [...acc, ...flatten(cur)];
    }, []);
   };
   
console.log(flatten(arr));