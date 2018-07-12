const Service = require('./Service.js');
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






}

module.exports = BasicCommand;