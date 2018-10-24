const Api = require('./Api.js');
const api = new Api();
/**
 *  handle data from the Kitsu API 
 *  https://kitsu.docs.apiary.io/
 */
class Kitsu extends Api {

    constructor(Discord, service, info){
        // Classes
        super();
        this.discord = Discord;
        this.service = service;
        this.info = info;
        // Kitsu Api, required parameter
        this.kitsuData;
        this.kitsuSlug;
        this.title;
        this.kitsuUrl;
        
        this.dataValid;
    }

    /**
     * get an anime or manga by its name
     * @param {*string} mediaName, name of the media (anime, manga) requested
     * @param {*string} mediaType define if the media is an anime or a manga, compare it by the command sent
     */
    loadMedia(mediaName, mediaType){

        // init valid data
        this.dataValid = true;
        // get anime name format "like-that"
        this.kitsuSlug = this.formatItem(mediaName);

        // generate API request
        if(mediaType == this.info.commands.anime){
            var req = `https://kitsu.io/api/edge/anime?filter[text]=${this.kitsuSlug}&filter[subtype]=TV,movie,OAV,ONA`;
            this.kitsuUrl = 'https://kitsu.io/api/edge/anime';
        } else {
            var req = `https://kitsu.io/api/edge/manga?filter[text]=${this.kitsuSlug}&filter[subtype]=manga,novel`;
            this.kitsuUrl = 'https://kitsu.io/api/edge/manga';
        }

        
        var res = this.getData(req);

        // Check if valid data
        if((typeof res.data[0] == 'undefined') || typeof res.data[0].attributes === 'undefined'){
            this.dataValid = false;
            return;
        }

        this.kitsuData = res.data[0].attributes;

        // array the media different titles, check if the media request match one of those titles
        var avalaibleTitles = [this.kitsuData.titles.en_jp, 
                                this.kitsuData.titles.en,
                                this.kitsuData.canonicalTitle
                            ];

        // Check if the mediaName given as parameter is a part of one of the animes titles (english and japanese version)
        this.title = this.service.searchInStrings(mediaName, avalaibleTitles);

        if(this.title == null){
            this.dataValid = false;
        }
    }

    displayCurrentMedia(){
        
        // handle error response
        if(this.dataValid == false){
            return "I don't know this anime, I'm not a weeb like you";
        }

        var embed = new this.discord.RichEmbed()
            .setTitle(this.title)
            .setImage(this.kitsuData.posterImage.small)
            .setDescription(this.kitsuData.synopsis)
            .setColor("#d0f0c0")
            .addField("Type", this.kitsuData.subtype, true)
            .addField("Status", this.kitsuData.status, true)
            .addField("Start date", this.kitsuData.startDate, true)
            .addField("Rank", this.kitsuData.ratingRank + "th", true)
            .addField("Popularity Rank", this.kitsuData.popularityRank + "th", true)
            .addField("Average score", this.kitsuData.averageRating + "/100", true)
            .setURL(this.kitsuUrl + this.kitsuData.slug)

        return embed;
    }



}

module.exports = Kitsu;