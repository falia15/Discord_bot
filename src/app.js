// Initialise dependencies and require needed class
const Discord = require("discord.js");
const Command = require('./Class/Command');
const Service = require('./Class/Service.js');
const Pendu = require('./Class/Pendu.js');
const BasicCommand = require('./Class/BasicCommand.js');

// Json config files
const config = require("../config.json");
const info = require('../info.json');

// initialise needed Class
const myBot = new Discord.Client();
const command = new Command();
const service = new Service();
const pendu = new Pendu();
const basicCommand = new BasicCommand();

// Check if the bot is working
myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity(info.jeu);
});

// init Pendu Game variable
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

    // PENDU GAME

    // get all content after the prefix + pendu command (here =prefix)
    var penduMessage = command.getMessageContent(message, info.penduCommand);
    
    // check if the game start command is send
    if(penduMessage == info.penduGameStart){
        
        if(word != 0){
            return message.channel.send('A game already begun');
        }

        word = pendu.getWord();
        wordGuess = pendu.genereWordGuess(word);
        life = 12;

        message.channel.send(`A new game was launch ! Do your best ! \n Word : ${wordGuess}`);
    
    }

    // check if a letter was send with the pendu command
    if(service.isLetter(penduMessage)){

        // check if the game was previously initialise, as 0 is the default value of "word" variable
        if(word == 0){
            return message.channel.send(`You first need to start the game with ${info.prefix}${info.penduCommand}${info.penduGameStart}`);
        }

        // return an array of the letter index inside the word variable
        var arrayOfLetter = pendu.isLetterInWord(word, penduMessage);

        // check if the array lenth is bigger than 0, it means the user's letter was in the word
        if(arrayOfLetter.length > 0){
            wordGuess = pendu.updateWordGuess(wordGuess, arrayOfLetter, penduMessage)

            message.channel.send(wordGuess);
        } else {
            // if the user's letter was not in the word, decrease life point and send error message
            life--;

            if(life > 0){
                message.channel.send(`The letter ${penduMessage} is not in the word, you still have ${life} life`);
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
    if(penduMessage == 'show'){
        if( word != 0){
            message.channel.send(`The current word is : ${wordGuess}`);
        } else {
            message.channel.send(`You first need to start the game with ${info.prefix}${info.penduCommand}${info.penduGameStart}`);
        }
    }

});

myBot.login(config.token);