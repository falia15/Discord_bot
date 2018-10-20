// Json config files
const config = require("../config.json");
const info = require('../info.json');

// Initialise dependencies and require needed class
const Discord = require("discord.js");

const Command = require('./Class/Command');
const Service = require('./Class/Service.js');
const Hangman = require('./Class/Hangman.js');
const BasicCommand = require('./Class/BasicCommand.js');
const Anime = require('./Class/Anime.js');
const Server = require('./Class/Server.js');

// initialise needed Class
const myBot = new Discord.Client();
const command = new Command(info);
const service = new Service();

//const hangman = new Hangman(service);
const basicCommand = new BasicCommand(Discord, service, info, command);
const anime = new Anime(Discord, service);
const server = new Server();

// Check if the bot is working
myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity(info.jeu + ` | ${info.prefix}help`);
});

let servers = [];

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
            server.addHangman(serverId, new Hangman(service, Discord));
        }
        let hangman = server.getHangman(serverId);

        // check if the game start command is send
        if(hangmanMessage == info.hangman.startGame){

            if(hangman.isRunning){
                return message.channel.send('The game has already begun');
            }

            hangman.isRunning = true;

            message.channel.send(`A new game was launch ! Do your best ! \n Word : ${hangman.wordGuess}`);
        
        }

        // check if a letter was send with the hangman command
        if(service.isLetter(hangmanMessage)){

            // check if the game was previously initialise, as 0 is the default value of "word" variable
            if(!hangman.isRunning){
                return message.channel.send(`You first need to start the game with ${info.prefix}${info.commands.hangman} ${info.hangman.startGame}`);
            }

            // return an array of the letter index inside the word variable
            var arrayOfLetter = hangman.isLetterInWord(hangmanMessage);

            // check if the array lenth is bigger than 0, it means the user's letter was in the word
            if(arrayOfLetter.length > 0){
                hangman.updateWordGuess(hangman.wordGuess, arrayOfLetter, hangmanMessage);

                message.channel.send(hangman.wordGuess);
            } else {
                // if the user's letter was not in the word, decrease life point and send error message
                hangman.life = hangman.life -1;
                hangman.addLetter(hangmanMessage);

                if(hangman.life > 0){
                    message.channel.send(`AHAHAH The letter ${hangmanMessage} is not in the word \n you still have ${hangman.life} life \nLetter said : ${hangman.getLettersToString()}`);
                } else {
                    message.channel.send(`You lost, the word was : ${hangman.word}`);
                    hangman.isRunning = false;
                }
            }

        }

        // winning condition
        if(hangman.wordGuess == hangman.word && hangman.isRunning){
            message.channel.send(`You won ! The word was ${hangman.word}`);
            hangman.resetValue();
        }

        // show the current word to guess
        if(hangmanMessage == info.hangman.showWord){
            if(hangman.isRunning){
                message.channel.send(`The current word is : ${hangman.wordGuess} \n Letter said : ${hangman.getLettersToString()}`);
            } else {
                message.channel.send(`You first need to start the game with ${info.prefix}${info.commands.hangman} ${info.hangman.startGame}`);
            }
        }

    }

    // ANIME FEATURES

    var animeName = command.getMessageContent(message, info.commands.anime);

    if(animeName){
        anime.getAnime(animeName);
        message.channel.send(anime.printAnime());
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

myBot.login(config.token);