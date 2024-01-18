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

const symbolsCount = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const symbolValue = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}


const deposit = () => {
    while(true){
        const depositAmount = parseFloat(prompt("Enter deposit amount: "));

        if(isNaN(depositAmount) || depositAmount <= 0){
            console.log("\nInvalid deposit amount, Try again!");
        }
        else{
            return depositAmount;
        }
    }
};

const getnumberOfLines = () => {
    while(true){
        const numberOfLines = parseInt(prompt("\nEnter the number of lines to bet (1 - 3): "));

        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log("\nInvalid number of lines. Try again!");
        }
        else{
            return numberOfLines;
        }
    }
};

const getBetAmount = (balance, numberOfLines) => {
    while(true){
        const betAmount = parseFloat(prompt("\nEnter the bet amount: "));

        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance / numberOfLines){
            console.log("\nInvalid bet amount. Try again!");
        }
        else{
            return betAmount;
        }
    }
};

const spin = () => {
  const symbols = [];  
  for(const [symbol, count] of Object.entries(symbolsCount)){
    for(let i=0; i < count; i++){
        symbols.push(symbol);
    }
  }

  const reels = []
  for(let i = 0; i < cols; i++){
    reels.push([]);
    const reelSymbols = [...symbols];
    for(let j = 0; j < rows; j++){
        const randomindex = Math.floor(Math.random() * reelSymbols.length)
        const selectedSymbol = reelSymbols[randomindex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomindex, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
    const transposeRows = [];

    for(let i = 0; i < rows; i++){
        transposeRows.push([]);
        for(let j = 0; j < cols; j++){
            transposeRows[i].push(reels[j][i]);
        }
    }

    return transposeRows;
};

const printTransposeRows = (transposeRows) => {
    console.log("\n");
    for(const row of transposeRows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | "; 
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (reelRows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = reelRows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * symbolValue[symbols[0]]; 
        }
    }
    return winnings;
};

const game = () => {
    let balance = deposit();

    while(true){
        const numberOfLines = getnumberOfLines();
        const bet = getBetAmount(balance, numberOfLines); 
        balance -= bet * numberOfLines;
        const reels = spin();
        const reelRows = transpose(reels);
        printTransposeRows(reelRows);
        const winnings = getWinnings(reelRows, bet, numberOfLines);
        balance += winnings;
        console.log("\nYou win " + winnings + " rupees");

        if(balance <= 0){
            console.log("\nYou ran out of money!");
            break;
        }
        else{
            console.log("\nYou have a balance of Rs."+ balance);
        }

        const playAgain = prompt("\nDo you want to play again (y / n) ? ");

        if(playAgain != "y"){
            break;
        }
    }
    
};

game();
