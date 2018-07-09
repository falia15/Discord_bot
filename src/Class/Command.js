botInfo = require('../../info.json');

class Command {
    /**
    * @param message string
    */
    getCommand(message) {
        let args = message.content.slice(botInfo.prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        return command;
    }

    ping(message){
        if(this.getCommand(message) == 'ping'){
            return true;
        }
    }

    joke(message){
        if(this.getCommand(message) == 'joke'){
            return true;
        }
    }

}

module.exports = Command;