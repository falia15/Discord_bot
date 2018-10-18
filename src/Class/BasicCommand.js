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
            .setAuthor("All might", "https://image.ibb.co/gQbbxT/all_might_9_35.jpg")
            .setDescription("Here is a list of the available commands")
            .setColor("#d0f0c0")
            .addField("Tell a joke",
                        `${this.info.prefix}${this.info.commands.joke}`)
            .addField("Hangman Game",
                        "One player thinks of a wordand the other(s) tries to guess it by suggesting letters, within a certain number of guesses.")
            .addField("Start the game",
                         ` ${this.info.prefix}${this.info.commands.hangman} ${this.info.hangman.startGame}`)
            .addField("Suggest a letter",
                        `${this.info.prefix}${this.info.commands.hangman} + letter, all alphabetical letter + é and è, (Not case-sensitive), `)
            .addField("Show the current word of the running game",
                        `${this.info.prefix}${this.info.commands.hangman} ${this.info.hangman.showWord}`)
                        .setImage("https://i.redd.it/2lhcvv45pmaz.jpg")
            .setFooter("Image Credit : https://www.reddit.com/r/BokuNoHeroAcademia/comments/6oc64d/all_might_and_the_young_boys/");
                        
        return embed;
        
    }

    /**
     * Split the message when it account ||
     * @param {*string} message
     * @return {*array} 
     */
    talkInstead(message){
        return this.command.getMessageContent(message, info.commands.talk).split('||');
    }



}

module.exports = BasicCommand;