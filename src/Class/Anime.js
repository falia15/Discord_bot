const Api = require('./Api.js');
const api = new Api();

class Anime extends Api {

    constructor(Discord, service, res){
        // Classes
        super(res);
        this.discord = Discord;
        this.service = service;
        // Kitsu Api, required parameter
        this.animeUrl = 'https://kitsu.io/anime/';
        this.animeData;
        this.animeSlug;
        this.title;
        
        this.dataValid;
    }

    getAnime(animeName){
        // init valid data
        this.dataValid = true;
        // get anime name format "like-that"
        this.animeSlug = this.formatItem(animeName);
        // generate API request
        var req = `https://kitsu.io/api/edge/anime?filter[text]=${this.animeSlug}&filter[subtype]=TV,movie,OAV,ONA`;
        
        this.getData(req);

        // Check if valid data
        if((typeof this.res.data[0] == 'undefined') || typeof this.res.data[0].attributes === 'undefined'){
            this.dataValid = false;
            return;
        }

        this.animeData = this.res.data[0].attributes;

        // Check if the animeName given as parameter is a part of one of the animes titles (english and japanese version)
        this.title = this.service.searchInStrings(animeName, [this.animeData.titles.en_jp, this.animeData.titles.en]);

        if(this.title == null){
            this.dataValid = false;
        }
    }

    printAnime(){
        
        // handle error response
        if(this.dataValid == false){
            return "I don't know this anime, I'm not a weeb like you";
        }

        var embed = new this.discord.RichEmbed()
            .setTitle(this.title)
            .setImage(this.animeData.posterImage.small)
            .setDescription(this.animeData.synopsis)
            .setColor("#d0f0c0")
            .addField("Type", this.animeData.subtype, true)
            .addField("Status", this.animeData.status, true)
            .addField("Start date", this.animeData.startDate, true)
            .addField("Rank", this.animeData.ratingRank + "th", true)
            .addField("Popularity Rank", this.animeData.popularityRank + "th", true)
            .addField("Average score", this.animeData.averageRating + "/100", true)
            .setURL(this.animeUrl + this.animeData.slug)

        return embed;
    }



}

module.exports = Anime;