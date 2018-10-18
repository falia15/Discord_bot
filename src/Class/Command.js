
/**
 * Hangle anything related to the Discord's server command users sent
 */
class Command {

    constructor(info){
        this.info = info;
    }

    /**
    * Get the command the user sent to the bot, splited message between the prefix and the following space
    * @param message string
    * @return command, string
    */
    getCommand(message) {
        if(!message.content.startsWith(this.info.prefix)){
            return;
        }
        let args = message.content.slice(this.info.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        return command;
    }

    /**
     * Get the content of the message after the prefix and the command
     * @param message, string, message send from Discord's server
     * @param command, string, command send with the message
     */
    getMessageContent(message, command){
        var commandInMessage = this.getCommand(message);
        var commands = this.info.commands;

        if(commandInMessage != command){
            return;
        }

        for(var proprety in commands){
            if(commandInMessage == commands[proprety]){
                return message.content.slice(this.info.prefix.length + command.length + 1).toLowerCase();
            }
        }

    }

    /**
     * Check if the command is "joke"
     * @param message
     * @return bool
     */
    joke(message){
        if(this.getCommand(message) == this.info.commands.joke){
            return true;
        }
    }

    /**
     * Check if the command is "help"
     * @param message
     * @return bool
     */
    help(message){
        if(this.getCommand(message) == this.info.commands.help){
            return true;
        }
    }

     /**
     * Check if the command is "help"
     * @param message
     * @return bool
     */
    say(message){
        if(this.getCommand(message) == this.info.commands.talk){
            return true;
        }
    }

}

module.exports = Command;