/**
 * Hangman the game
 */
class Hangman {

    constructor(service, Discord){
        this.service = service;
        this.discord = Discord;
        this.resetValue();
    }

    resetValue(){
        this.word = this.getWord();
        this.isRunning = false;
        this.life = 11;
        this.wordGuess = this.genereWordGuess();
        this.letters = [];
    }

    /**
     * random word whitin an array of word.
     * @return {*string}
     */
    getWord(){
        var arrayOfWord = require('../data/word.js');
        var word = this.service.getRandomInArray(arrayOfWord);

        return word;
    }

    /**
     * check if the letter parameter is in the word parameter, return an array of the letter position in the word string
     * @param {*char} letter
     * @return {*array} 
     */
    isLetterInWord(letter){
        var wordToVerif = this.word;

        // handle é as an e
        if(wordToVerif.includes("é")) {
            wordToVerif = this.service.replaceAll(wordToVerif, "é", "e");
        }

        // handle è as an e
        if(wordToVerif.includes("è")) {
            wordToVerif = this.service.replaceAll(wordToVerif, "è", "e");
        }

        return this.service.strSearchAll(wordToVerif, letter);
    }

    /**
     * Genere a masked string from the string given as parameter
     * @param {*string} word
     * @return {*string}
     */
    genereWordGuess(){
        var wordGuess = '';
        for(var i=0; i<this.word.length; i++){
            wordGuess += '-';
        }
        return wordGuess;
    }

    /**
     * Replace by the char given as parameter, the index of arrayOfIndex parameter inside the wordGuess parameter
     * @param {*string} wordGuess 
     * @param {*array} arrayOfIndex 
     * @param {*string} char
     */
    updateWordGuess(wordGuess, arrayOfIndex){
        // get original letter of the word, using to replace in the new word
        var arrayOfLetter = [];
        for(i = 0; i < arrayOfIndex.length; i++){
            arrayOfLetter[i] = this.word.charAt(arrayOfIndex[i]);
        }

        // replace wordguess by the letter of arrayOfletter, at the position index in arrayOfIndex
        for(var i = 0; i < arrayOfIndex.length; i++){
            var wordGuess = this.service.ReplaceAtIndex(wordGuess, arrayOfIndex[i], arrayOfLetter[i]);
        }

        this.wordGuess = wordGuess;
    }

    addLetter(letter){
        this.letters.push(letter.toUpperCase());
    }

    getLettersToString(){
        var letterList = '';
        for(var i=0; i<this.letters.length; i++){
            letterList += this.letters[i] + " ";
        }
        return letterList;
    }

    

}

module.exports = Hangman;