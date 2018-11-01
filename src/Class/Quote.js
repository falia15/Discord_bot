
class Quote {

    isQuote(message){
        var quotes = require('../data/quote.js');
        var message = message.content.toLowerCase();

        for (var key in quotes) {
            if(message.includes(key)){
                return quotes[key];
            }
          }
        return false;
    }



}

module.exports = Quote;