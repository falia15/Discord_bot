// Initialise dependencies and require needed class
const Discord = require("discord.js");
const Command = require('./Class/Command');
const Service = require('./Class/Service.js');
const Hangman = require('./Class/Hangman.js');
const BasicCommand = require('./Class/BasicCommand.js');

// Json config files
const config = require("../config.json");
const info = require('../info.json');

// initialise needed Class
const myBot = new Discord.Client();
const command = new Command();
const service = new Service();
const hangman = new Hangman();
const basicCommand = new BasicCommand();

// Check if the bot is working
myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity(info.jeu + `| ${info.prefix}help`);
});

// init Hangman Game variable
var word = 0;
var wordGuess = 1;
var life;

myBot.on('message', message => {

    // prevent from answering to itself
    if(message.author.id === myBot.user.id) return;

    if(command.joke(message)){

        joke = basicCommand.getJoke();

        message.channel.send(joke);
    }

    if(command.help(message)){
        message.author.send(basicCommand.getHelp());
    }

    // PENDU GAME

    // get all content after the prefix + hangman command (here =prefix)
    if(command.hangman(message)){
        var hangmanMessage = command.getMessageContent(message, info.hangmanCommand).toLowerCase();
    } else {
        var hangmanMessage = false;
    }
    
    // check if the game start command is send
    if(hangmanMessage == info.hangmanGameStart){
        
        if(word != 0){
            return message.channel.send('A game already begun');
        }

        word = hangman.getWord();
        wordGuess = hangman.genereWordGuess(word);
        life = 12;

        message.channel.send(`A new game was launch ! Do your best ! \n Word : ${wordGuess}`);
    
    }

    // check if a letter was send with the hangman command
    if(service.isLetter(hangmanMessage)){

        // check if the game was previously initialise, as 0 is the default value of "word" variable
        if(word == 0){
            return message.channel.send(`You first need to start the game with ${info.prefix}${info.hangmanCommand}${info.hangmanGameStart}`);
        }

        // return an array of the letter index inside the word variable
        var arrayOfLetter = hangman.isLetterInWord(word, hangmanMessage);

        // check if the array lenth is bigger than 0, it means the user's letter was in the word
        if(arrayOfLetter.length > 0){
            wordGuess = hangman.updateWordGuess(wordGuess, arrayOfLetter, hangmanMessage)

            message.channel.send(wordGuess);
        } else {
            // if the user's letter was not in the word, decrease life point and send error message
            life--;

            if(life > 0){
                message.channel.send(`The letter ${hangmanMessage} is not in the word, you still have ${life} life`);
            } else {
                message.channel.send(`You lost, the word was : ${word}`);
                word = 0;
            }
        }

    }

    // winning condition
    if(wordGuess == word){
        message.channel.send(`You won ! The word was ${word}`);
        word = 0;
    }

    // show the current word to guess
    if(hangmanMessage == info.hangmanGameShow){
        if( word != 0){
            message.channel.send(`The current word is : ${wordGuess}`);
        } else {
            message.channel.send(`You first need to start the game with ${info.prefix}${info.hangmanCommand}${info.hangmanGameStart}`);
        }
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