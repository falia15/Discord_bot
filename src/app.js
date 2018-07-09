const Discord = require("discord.js");
const Command = require('./Class/Command');
const config = require("../config.json");
const Service = require('./Class/Service.js');

const myBot = new Discord.Client();
const command = new Command();
const service = new Service();

myBot.on('ready',  () => {
    console.log("Je suis là !");
    myBot.user.setActivity("jeu en cours");
});

myBot.on('message', message => {

    // prevent from answering to itself
    if(message.author.id === myBot.user.id) return;

    if(command.ping(message)){
        message.reply('pong');
    }

    if(command.joke(message)){

        joke = service.getJoke();

        message.channel.send(joke);
    }

});

myBot.login(config.token);