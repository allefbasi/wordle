import {compareWords} from "../src/compareWords.js";

function areArraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i];
        const element2 = array2[i];
        if (element2 !== element1) {
            return false;
        }
    }
    return true;
}

function compare(description, actual, expected) {
    const equal = areArraysEqual(actual, expected);
    if (equal) {
        console.log(`${description}: 👍`)
    } else {
        console.log(`${description} failed.`)
        console.log({expected})
        console.log({actual})
    }
}

function testCase1() {
    const guess = 'LEMON'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'green', 'green', 'green', 'green'];
    compare('case 1', colorArray, expected)
}

function testCase2() {
    const guess = 'LCONJ'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'grey', 'yellow', 'yellow', 'grey'];
    compare('case 2', colorArray, expected)
}

function testCase3() {
    const guess = 'ABCTJ'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['grey', 'grey', 'grey', 'grey', 'grey'];
    compare('case 3', colorArray, expected)
}

function testCase4() {
    const guess = 'MOLNE';
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['yellow', 'yellow', 'yellow', 'yellow', 'yellow'];
    compare('case 4', colorArray, expected)
}

function testCase5() {
    const guess = 'AOENE'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['grey', 'yellow', 'yellow', 'yellow', 'grey'];
    compare('case 5', colorArray, expected)
}


function testCase6() {
    const guess = 'AOENE'
    const secret = 'LEMEN';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['grey', 'grey', 'yellow', 'yellow', 'yellow'];
    compare('case 6', colorArray, expected)
}

function testCase7() {
    const guess = 'LOMON'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'grey', 'green', 'green', 'green'];
    compare('case 7', colorArray, expected)
}

function testCase8() {
    const guess = 'LOOXX'
    const secret = 'LEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'yellow', 'grey', 'grey', 'grey'];
    compare('case 8', colorArray, expected)
}

function testCase9() {
    const guess = 'NNNXX'
    const secret = 'NEMON';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'yellow', 'grey', 'grey', 'grey'];
    compare('case 9', colorArray, expected)
}

function testCase10() {
    const guess = 'EGEET'
    const secret = 'GREEN';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['grey', 'yellow', 'green', 'green', 'grey'];
    compare('case 10', colorArray, expected)
}

function testCase11() {
    const guess = 'AAZZZ'
    const secret = 'AAXXX';
    const guessArray = guess.split('');
    const colorArray = compareWords(guessArray, secret);
    const expected = ['green', 'green', 'grey', 'grey', 'grey'];
    compare('case 11', colorArray, expected)
}

testCase1()
testCase2()
testCase3()
testCase4()
testCase5()
testCase6()
testCase7()
testCase8()
testCase9()
testCase10()
testCase11()
