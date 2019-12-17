
function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    let countFreq = {}, count = 0;
    for (letter of S) {
        countFreq[letter] = countFreq[letter] ? countFreq[letter] + 1 : 1;
    }
    let freqArr = Object.values(countFreq);
    for (let i = 0; i < freqArr.length; i++) {
        while (freqArr.includes(freqArr[i]) && i !== freqArr.indexOf(freqArr[i]) && freqArr[i] > 0) {
            freqArr[i]--;
            count++;
        }
    }
    return count;
}

console.log(solution('ccaaffddecee'));