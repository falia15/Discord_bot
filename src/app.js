// Json config files
const config = require("../config.json");
const info = require('../info.json');

// Initialise dependencies and require needed class
const Discord = require("discord.js");
const fetch = require("node-fetch");

// business Class
const Service = require('./Class/business/Service.js');
const Server = require('./Class/business/Server.js');

// command class
const Command = require('./Class/Command');
const BasicCommand = require('./Class/BasicCommand.js');

// feature/game Class
const Hangman = require('./Class/Hangman/Hangman.js');
const Kitsu = require('./Class/Anime/Kitsu.js');
const Quote = require('./Class/Quote.js');


// initialise needed Class
const myBot = new Discord.Client();
const command = new Command(info);
const service = new Service();

//const hangman = new Hangman(service);
const basicCommand = new BasicCommand(Discord, service, info, command);
const kitsu = new Kitsu(Discord, service, info, fetch);
const server = new Server();
const quote = new Quote();

// Check if the bot is working
myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity(info.jeu + ` | ${info.prefix}help`);
});

myBot.on('message', message => {

    // prevent from answering to itself
    if(message.author.id === myBot.user.id) return;

    // tell a random joke
    if(command.joke(message)){
        joke = basicCommand.getJoke();
        message.channel.send(joke);
    }

    // send an mp with the list of the available command
    if(command.help(message)){
        message.author.send(basicCommand.getHelp());
    }

    // HANGMAN GAME

    // get all content after the prefix + hangman command (here =prefix)
    var hangmanMessage = command.getMessageContent(message, info.commands.hangman);
    var serverId = server.getIdServer(message);
    
    if(hangmanMessage && serverId != null){
        
        if(typeof server.getHangman(serverId) == 'undefined'){
            server.addHangman(serverId, new Hangman(service, info));
        }
        let hangman = server.getHangman(serverId);

        // check if the game start command is send
        if(hangmanMessage == hangman.startCommand()){

            if(hangman.isRunning){
                return message.channel.send('The game has already begun');
            }

            hangman.start();

            message.channel.send(`A new game was launch ! Do your best ! \n Word : ${hangman.word.wordGuess}`);
        
        }

        // check if a letter was send with the hangman command
        if(service.isLetter(hangmanMessage)){

            // check if the game was previously initialise, as 0 is the default value of "word" variable
            if(hangman.isRunning == false){
                return message.channel.send('You first need to start the game with ' + hangman.fullStartCommand());
            }

            // return an array of the letter index inside the word variable
            var arrayOfLetter = hangman.word.isLetterInWord(hangmanMessage);

            // check if the array lenth is bigger than 0, it means the user's letter was in the word
            if(arrayOfLetter.length > 0){
                hangman.word.updateWordGuess(hangman.word.wordGuess, arrayOfLetter, hangmanMessage);

                message.channel.send(hangman.word.wordGuess);
            } else {
                // if the user's letter was not in the word, decrease life point and send error message
                hangman.decreaseLife();
                hangman.word.addLetter(hangmanMessage);

                if(hangman.hasLife()){
                    message.channel.send(`AHAHAH The letter "${hangmanMessage}" is not in the word \n you still have ${hangman.life} life \nLetter said : ${hangman.word.getLettersToString()}`);
                } else {
                    message.channel.send(`You lost, the word was : ${hangman.word.wordToFind}`);
                    hangman.stop();
                    hangman.word.resetValue();
                }
            }

        }

        // winning condition
        if(hangman.isGameWin()){
            message.channel.send(`You won ! The word was "${hangman.word.wordToFind}"`);
            hangman.resetValue();
        }

        // show the current word to guess
        if(hangmanMessage == hangman.showCommand()){
            if(hangman.isRunning){
                message.channel.send(`The current word is : ${hangman.word.wordGuess} \n Letter said : ${hangman.word.getLettersToString()}`);
            } else {
                message.channel.send('You first need to start the game with ' + hangman.fullStartCommand());
            }
        }

    }

    // ANIME FEATURES

    var animeName = command.getMessageContent(message, info.commands.anime);
    var mangaName = command.getMessageContent(message, info.commands.manga);

    if(animeName || mangaName){

        let mediaCommand = animeName ? info.commands.anime : info.commands.manga;

        if(!kitsu.createMedia(animeName, mediaCommand)){
            message.channel.send('Wtf is that');
            return;
        }
        
        kitsu.handleRequest(kitsu.getRequest()).then(data => {
            if(data == false){
                message.channel.send("I don't know this anime, I'm not a weeb like you");
                return;
            }
            let anime = kitsu.displayMedia(data);
            message.channel.send(anime);
        }).catch(error => {
            console.log(error);
        });
        
    }

    var quoteMessage = quote.isQuote(message);

    if(quote.isQuote(message)){
        message.channel.send(quoteMessage);
    }

    // only owner command
    if(message.author.id !== config.OwnerID) return;

    // talk instead of the bot
    if(command.say(message)){

        if(message.content.search('||') < 0)
        return;
        
        var fields = basicCommand.talkInstead(message);
        
        if(!myBot.channels.get(fields[0]))
        return;

        myBot.channels.get(fields[0]).send(fields[1]);

    }
    
});

myBot.on("error", (e) => console.error(e));
myBot.on("warn", (e) => console.warn(e));
myBot.on("debug", (e) => console.info(e));

myBot.login(config.token);