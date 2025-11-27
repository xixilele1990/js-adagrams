const LETTER_POOL = {
    'A': 9, 
    'B': 2, 
    'C': 2, 
    'D': 4, 
    'E': 12, 
    'F': 2, 
    'G': 3, 
    'H': 2, 
    'I': 9, 
    'J': 1, 
    'K': 1, 
    'L': 4, 
    'M': 2, 
    'N': 6, 
    'O': 8, 
    'P': 2, 
    'Q': 1, 
    'R': 6, 
    'S': 4, 
    'T': 6, 
    'U': 4, 
    'V': 2, 
    'W': 2, 
    'X': 1, 
    'Y': 2, 
    'Z': 1
}

const SCORE_CHART = {
    1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
    2: ["D", "G"],
    3: ["B", "C", "M", "P"],
    4: ["F", "H", "V", "W", "Y"],
    5: ["K"],
    8: ["J", "X"],
    10: ["Q", "Z"],
  };


export const drawLetters = () => {
  const cardPool = []
  for (const letter in LETTER_POOL){
    const qty = LETTER_POOL[letter];
      cardPool.push(...Array(qty).fill(letter))
  }

  const hand = [];
  
  for (let i = 0; i < 10; i++){
    const ind = Math.floor(Math.random() * cardPool.length);
    hand.push(cardPool[ind]);
    cardPool.splice(ind,1);
  }  
  return hand;
};
 

export const usesAvailableLetters = (input, lettersInHand) => {
  const freq = {}
  for(const char of lettersInHand){
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const singleChar of input){
    if(!freq[singleChar.toUpperCase()]||freq[singleChar.toUpperCase()] < 0 ){
      return false;
    }
    freq[singleChar.toUpperCase()] -=1;
  }
return true;

};

export const scoreWord = (word) => {
  if (word.length === 0) {
    return 0;
  }
  const letterScore = {};
  for (const score in SCORE_CHART) {
    for (const letter of SCORE_CHART[score]) {
      letterScore[letter] = Number(score);
    }
  }

  let total = 0;
  for (const char of word) {
    total += letterScore[char.toUpperCase()] || 0;
  }

  if (word.length > 6 && word.length < 11) {
    total += 8;
  }
  return total;
};




export const highestScoreFrom = (words) => {
  let tempScore = -1;
  let best = words[0];
    for (const word of words){
        const total_score = scoreWord(word);
        
        if (total_score > tempScore){
          tempScore = total_score;
          best = word;
        } else if (total_score === tempScore){      //:  # tie situation
              
            if (best.length === 10){
              continue;
            } else if(word.length === 10){
              best = word;
            } else if (word.length < best.length){ 
              best =word;
            }
        }         
      }
    return { word: best, score: tempScore };
}
