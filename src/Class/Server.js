
class Server {

    constructor(){
        this.servers = [];
    }

    addHangman(serverId, hangman){
        this.servers[serverId] = hangman;
    }

    getHangman(serverId){
        return this.servers[serverId];
    }

    getIdServer(message){
        if((message.guild !== null) && message.guild.id !== null){
            return message.guild.id;
            
        }
        return null;
    }

}

module.exports = Server;