// 1. Deposit the amount
// 2. Select the line
// 3. Select bet amount
// 4. Spin the machine
// 5. Check if the user won
// 6. Return the winning amount
// 7. Play again

const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;



const deposit = () => {
    while(true){
        const depositAmount = parseFloat(prompt("Enter deposit amount: "));

        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log("Invalid deposit amount, Try again!");
        }
        else{
            return depositAmount;
        }
    }
};

const getnumberOfLines = () => {
    while(true){
        const numberOfLines = parseInt(prompt("Enter the number of lines to bet (1 - 3): "));

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log("Invalid number of lines. Try again!");
        }
        else{
            return numberOfLines;
        }
    }
};

const getBetAmount = (balance, numberOfLines) => {
    while(true){
        const betAmount = parseFloat(prompt("Enter the bet amount: "));

        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance / numberOfLines){
            console.log("Invalid bet amount. Try again!");
        }
        else{
            return betAmount;
        }
    }
};

let balance = deposit();
const numberOfLines = getnumberOfLines();
const bet = getBetAmount(balance, numberOfLines); 