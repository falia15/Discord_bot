/**
 *  handle data from the Kitsu API 
 *  https://kitsu.docs.apiary.io/
 */
class Kitsu {

    constructor(Discord, service, info, fetch){
        /** @var {*Discord} */
        this.discord = Discord;

        /** @var {*Service}  */
        this.service = service;

        /**@var {*json} */
        this.info = info;

        /**@var {*Fectch API} */
        this.fetch = fetch;

        /**@var {* Media} */
        this.media;

        /**@var {*String} */
        this.request

        /**
         * Api request parameter
         * @var {*String} */
        this.param;
    }

    /**
     * setRequest either to a manga or an anime request
     * text filter retrives data from the synopsys and title of the media (not possible to search only in the title)
     * subtype filter handle media type, tv/movie/oav etc and manga/novel
     */
    setRequest(){
        if(this.media.setType() == 0){
            this.request = `https://kitsu.io/api/edge/manga?filter[text]=${this.media.slug}&filter[subtype]=manga,novel`;
        } else {
            this.request = `https://kitsu.io/api/edge/anime?filter[text]=${this.media.slug}&filter[subtype]=TV,movie,OAV,ONA`;
        }
    }

    getRequest(){
        return this.request;
    }

    /**
     * the parameter is the name of the media the user is searching for
     * @param {*string} param 
     */
    setParam(param){
        if(this.service.areSpecialChar(param)){
            this.param = param;
        }
    }

    /**
     * get an anime or manga by its name
     * @param {*string} name, name of the media (anime, manga) requested by the user
     * @param {*string} type anime or manga command, define if the media is an anime or a manga
     * @return {*bool} true if everything went as expected, false otherwise
     */
    createMedia(name, type){
        var Media = require('./Media.js');
        this.media = new Media(this.service, this.info);

        this.setParam(name);

        //invalid parameter
        if(this.param == null){
            return false;
        }
        
        this.media.setSlug(name);

        this.media.setType(type);

        this.setRequest();

        this.media.setUrl(type);
        
        return true;
    }

    /**
     * Fetch API request
     * @param {*string} request url
     * @return {*promise} formated data
     */
    async requestMedia(request) {
        //await the response of the fetch call
       let response = await this.fetch(request);
        //proceed once the first promise is resolved.
       let data = await response.json()
        //proceed only when the second promise is resolved
        return data;
    }

    /**
     * Handle request promise
     * @param {*string} request
     * @return {*Media}
     */
    handleRequest(request){
        return this.requestMedia(request).then(res => {
            
            if((typeof res.data == 'undefined') || (typeof res.data[0] == 'undefined') || typeof res.data[0].attributes === 'undefined'){
                return false;
            }
            
            var data = res.data[0].attributes;
            
            // as we can't retrives a media by its name, we have to compare all media title with our request parameter
            var avalaibleTitles = [data.titles.en_jp, 
                data.titles.en,
                data.canonicalTitle,
                data.slug.replace(/[-]/g, ' ')
            ];
            
            this.media.setTitle(this.param, avalaibleTitles);

            if(this.media.getTitle() == false){
                return false;
            }

            this.media.setData(data);

            return this.media;
        });
    }

    /**
     * display Media as a discord RichEmbed
     * @param {*Media} media
     * @return {*RichEmbed}
     */
    displayMedia(media){
        
        let embed = new this.discord.RichEmbed()
            .setTitle(media.getTitle())
            .setImage(media.data.posterImage.small)
            .setDescription(media.data.synopsis)
            .setColor("#d0f0c0")
            .addField("Type", media.data.subtype, true)
            .addField("Status", media.data.status, true)
            .addField("Start date", media.data.startDate, true)
            .addField("Rank", media.data.ratingRank + "th", true)
            .addField("Popularity Rank", media.data.popularityRank + "th", true)
            .addField("Average score", media.data.averageRating + "/100", true)
            .setURL(media.getUrl() + media.data.slug)

        return embed;
    }

}

module.exports = Kitsu;