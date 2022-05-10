export function compareWords(guessArray, secret) {
    const secretArray = secret.split('');
    const colorArray = [];
    for (let i = 0; i < guessArray.length; i++) {
        const guessLetter = guessArray[i];
        if (guessLetter === secretArray[i]) {
            colorArray[i] = 'green';
            continue;
        }
        let color = 'grey';
        for (let j = 0; j < secretArray.length; j++) {
            const secretLetter = secretArray[j];
            if (guessLetter === secretLetter) {
                let greenCount = 0;
                let yellowToBeCount = 0;
                for (let k = 0; k < guessArray.length; k++) {
                    if (guessArray[k] !== guessLetter) {
                        continue;
                    }
                    if (secretArray[k] !== guessLetter) {
                        if (k < i) {
                            yellowToBeCount++;
                        }
                        continue;
                    }
                    greenCount++;
                }
                let letterInSecretCount = 0;
                for (let k = 0; k < secretArray.length; k++) {
                    if (guessLetter !== secretArray[k]) {
                        continue;
                    }
                    letterInSecretCount++;
                }

                if (greenCount + yellowToBeCount < letterInSecretCount) {
                    color = 'yellow';
                }
                break;
            }
        }
        colorArray[i] = color;
    }
    return colorArray;
}
