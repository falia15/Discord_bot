class Service {

    getRandomInArray(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    getJoke(){
        var array = require('../data/joke.js');
        
        var joke = this.getRandomInArray(array);

        return joke;
    }

}

module.exports = Service;