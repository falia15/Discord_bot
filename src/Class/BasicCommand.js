const Service = require('./Service.js');
const info = require('../../info.json');
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

    /**
     * Return a string that contains all the command available
     * @return {*string}
     */
    getHelp(){
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()
            .setTitle("Command List")
            .setAuthor("All might", "https://image.ibb.co/gQbbxT/all_might_9_35.jpg")
            .setDescription("Here is a list of the available commands")
            .setColor("#d0f0c0")
            .addField("Tell a joke",
                        `${info.prefix}${info.jokeCommand}`)
            .addField("Hangman Game",
                        "One player thinks of a wordand the other(s) tries to guess it by suggesting letters, within a certain number of guesses.")
            .addField("Start the game",
                        `${info.prefix}${info.hangmanCommand} ${info.hangmanGameStart}`)
            .addField("Suggest a letter",
                        `${info.prefix}${info.hangmanCommand} + letter, all alphabetical letter + é and è, (Not case-sensitive), `)
            .addField("Show the current word of the running game",
                        `${info.prefix}${info.hangmanCommand} show`)
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
        const Command = require('./Command.js');
        var command = new Command();

        let fields = command.getMessageContent(message, info.talkCommand).split('||');

        return fields;

    }



}

module.exports = BasicCommand;