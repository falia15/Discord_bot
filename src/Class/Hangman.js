const Service = require('./Service.js');
/**
 * Hangman the game
 */
class Hangman {

    /**
     * random word whitin an array of word.
     * @return {*string}
     */
    getWord(){
        var arrayOfWord = require('../data/word.js');
        var service = new Service();
        var word = service.getRandomInArray(arrayOfWord);

        return word;
    }

    /**
     * check if the letter parameter is in the word parameter, return an array of the letter index inside the word variable
     * @param {string} word 
     * @param {*char} letter
     * @return {*array} 
     */
    isLetterInWord(word, letter){
        var service = new Service();
        return service.strSearchAll(word, letter);
    }

    /**
     * Genere a masked string from the string given as parameter
     * @param {*string} word
     * @return {*string}
     */
    genereWordGuess(word){
        var wordGuess = word.replace(/[a-z-éè]/g, '-');
        return wordGuess;
    }

    /**
     * Replace by the char given as parameter, the index of arrayOfIndex parameter inside the wordGuess parameter
     * @param {*string} wordGuess 
     * @param {*array} arrayOfIndex 
     * @param {*string} char
     */
    updateWordGuess(wordGuess, arrayOfIndex, char){
        var service = new Service();

        for(var i = 0; i < arrayOfIndex.length; i++){
            var wordGuess = service.ReplaceAtIndex(wordGuess, arrayOfIndex[i], char);
        }

        return wordGuess;
    }

    

}

module.exports = Hangman;