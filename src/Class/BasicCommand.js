const Service = require('./Service.js');
const botInfo = require('../../info.json');
/** 
 * Handle every other feature that are too simple to have their own class
*/
class BasicCommand {

    /**
     * Return the result of getRandomInArray method, with the joke's array as a parameter
     * @return {*string} joke
     */
    getJoke(){
        var array = require('../data/joke.js');
        var service = new Service;
        
        return service.getRandomInArray(array);
    }


    getHelp(){
        var string =` 
        **Command line** \n
        ${botInfo.prefix}${botInfo.jokeCommand} : Tell a random joke. \n
        **Hangman game** \n
        *The bot thinks of a word, word and the other(s) tries to guess it by suggesting letters, within a certain number of guesses*\n
        ${botInfo.prefix}${botInfo.hangmanCommand} + ${botInfo.hangmanGameStart}  : Start the game. \n
        ${botInfo.prefix}${botInfo.hangmanCommand} + letter : Suggest a letter, it's not case sensitive, accent and special character are not taken into account. \n
        ${botInfo.prefix}${botInfo.hangmanCommand} + ${botInfo.hangmanGameShow} : Show the word of the current game, in case you forget it. \n
         `;

        var markdown = "```";
        return string;
    }



}

module.exports = BasicCommand;