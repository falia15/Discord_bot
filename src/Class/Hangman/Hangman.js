/**
 * Represente a party of hangman
 */
class Hangman {

    constructor(service, info){
        this.info = info;

        const Word = require('./Word.js');
        this.word = new Word(service);

        this.resetValue();
    }

    resetValue(){
        this.isRunning = false;
        this.life = 11
        this.word.resetValue();
    }

    /**
     * check if the game has the winning conditions
     * @return {*boolean}
     */
    isGameWin(){
        return this.word.wordGuess == this.word.wordToFind && this.isRunning
    }

    /**
    * @return {*string} full command to start an hangman game, with prefix and hangman command
    */
    fullStartCommand(){
        return this.info.prefix + this.info.commands.hangman + ' ' + this.info.hangman.startGame;
    }

    /**
     * @return {*string} command to start the game
     */
    startCommand(){
        return this.info.hangman.startGame;
    }

    /**
     * @return {*string} command to show the current word
     */
    showCommand(){
        return this.info.hangman.showWord;
    }

    stop(){
        this.isRunning = false;
    }

    start(){
        this.isRunning = true;
    }

    decreaseLife(){
        this.life = this.life -1;
    }

    /**
     * @return {*boolan}
     */
    hasLife(){
        if(this.life > 0){
            return true;
        }
        return false;
    }



}

module.exports = Hangman;