/**
 * Class used to handle multi discord server
 */
class Server {

    /**
     * Initialise array of server
     */
    constructor(){
        this.servers = [];
    }

    /**
     * Get the server id of a discord server
     * @param {*string} message 
     */
    getIdServer(message){
        if((message.guild !== null) && message.guild.id !== null){
            return message.guild.id;
            
        }
        return null;
    }

    /**
     * Insinde the servers array, Store an hangman object define by the serverId
     * @param {*string} serverId 
     * @param {*object} hangman 
     */
    addHangman(serverId, hangman){
        this.servers[serverId] = hangman;
    }

    /**
     * Get hangman object by server id
     * @param {*} serverId 
     */
    getHangman(serverId){
        return this.servers[serverId];
    }


}

module.exports = Server;