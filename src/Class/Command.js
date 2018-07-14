botInfo = require('../../info.json');
/**
 * Hangle anything related to the Discord's server command users sent
 */
class Command {

    /**
    * Get the command the user sent to the bot, splited message between the prefix and the following space
    * @param message string
    * @return command, string
    */
    getCommand(message) {
        let args = message.content.slice(botInfo.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        return command;
    }

    /**
     * Get the content of the message after the prefix and the command
     * @param message, string, message send from Discord's server
     * @param command, string, command send with the message
     */
    getMessageContent(message, command){
        var prefixLenght = botInfo.prefix.length;
        var commandLenght =  command.length;
        return message.content.slice(prefixLenght + commandLenght + 1);
    }

    /**
     * Check if the command is "joke"
     * @param message
     * @return bool
     */
    joke(message){
        if(this.getCommand(message) == botInfo.jokeCommand){
            return true;
        }
    }

    /**
     * Check if the command is "hangman"
     * @param message
     * @return bool
     */
    hangman(message){
        if(this.getCommand(message) == botInfo.hangmanCommand){
            return true;
        }
    }

    /**
     * Check if the command is "help"
     * @param message
     * @return bool
     */
    help(message){
        if(this.getCommand(message) == botInfo.helpCommand){
            return true;
        }
    }

     /**
     * Check if the command is "help"
     * @param message
     * @return bool
     */
    say(message){
        if(this.getCommand(message) == botInfo.talkCommand){
            return true;
        }
    }


}

module.exports = Command;