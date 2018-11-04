/** 
 * Handle every other feature that are too simple to have their own class
*/
class BasicCommand {

    constructor(Discord, service, info, command){
        this.discord = Discord;
        this.service = service
        this.info = info;
        this.command = command;
    }

    /**
     * Return the result of getRandomInArray method, with the joke's array as a parameter
     * @return {*string} joke
     */
    getJoke(){
        var array = require('../data/joke.js');
        return this.service.getRandomInArray(array);
    }

    /**
     * Return a string that contains all the command available
     * @return {*string}
     */
    getHelp(){
        var embed = new this.discord.RichEmbed()
            .setTitle("Command List")
            .setDescription("Here are a list of the available commands")
            .setColor("#d0f0c0")
            .addField("Tell a joke",
                        `${this.info.prefix}${this.info.commands.joke}`)
            .addField("Search anime/manga",
                        `${this.info.prefix}${this.info.commands.anime} + anime name | ${this.info.prefix}${this.info.commands.manga} + manga name`)
            .addField("Hangman Game",
                        "One player thinks of a word and the other(s) tries to guess it by suggesting letters, within a certain number of guesses.")
            .addField("Start the game",
                         ` ${this.info.prefix}${this.info.commands.hangman} ${this.info.hangman.startGame}`)
            .addField("Suggest a letter",
                        `${this.info.prefix}${this.info.commands.hangman} + letter`)
            .addField("Show the current word of the running game",
                        `${this.info.prefix}${this.info.commands.hangman} ${this.info.hangman.showWord}`)
            .setImage("https://www.ps4wallpapers.com/wp-content/uploads/2018/01/PS4Wallpapers.com_5a6308ad94dee_persona5wall.jpg")
                        
        return embed;
        
    }

    /**
     * Split the message when it account ||
     * @param {*string} message
     * @return {*array} 
     */
    talkInstead(message){
        return this.command.getMessageContent(message, this.info.commands.talk).split('||');
    }



}

module.exports = BasicCommand;