// Initialise dependencies and require needed class
const Discord = require("discord.js");
const Command = require('./Class/Command');
const Service = require('./Class/Service.js');
const Pendu = require('./Class/Pendu.js');

// Json config files
const config = require("../config.json");
const info = require('../info.json');

// initialise needed Class
const myBot = new Discord.Client();
const command = new Command();
const service = new Service();
const pendu = new Pendu();

myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity("jeu en cours");
});

myBot.on('message', message => {

    // prevent from answering to itself
    if(message.author.id === myBot.user.id) return;

    if(command.joke(message)){

        joke = service.getJoke();

        message.channel.send(joke);
    }
    
    if(command.pendu(message)){
        
        const messageAfterPrefix = command.getMessageContent(message, info.penduCommand);

    }

});

myBot.login(config.token);