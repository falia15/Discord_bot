/**
 * Represent a media(can be an anime, manga or even novel) retrives from the Kitsu api
 */
class Media {

    constructor(service, info){
        /**@var {*Service} */
        this.service = service;

        /**@var {*json} */
        this.info = info;

        /**@var {*string} */
        this.slug;

        /**@var {*string} */
        this.url;

        /** 
         * @var {*integer} 
         * define its an anime or a manga, 0 stand for manga/novel, 1 for anime
         * */
        this.type;

        /**@var {*json} */
        this.data;

        /**@var {*string} */
        this.title;
    }

    /**
     * @param {*integer} type 
     */
    setUrl(type){
        if(type == 0){
            this.url = 'https://kitsu.io/manga/';
        } else {
            this.url = 'https://kitsu.io/anime/';
        }
    }

    getUrl(){
        return this.url;
    }

    /**
     * @param {*string} name 
     */
    setSlug(name){
        this.slug = this.service.formatAsSlug(name);
    }
    
    setTitle(param, avalaibleTitles){
        let title = this.service.searchInStrings(param, avalaibleTitles);
        if(title){
            this.title = title;
        }

    }

    getTitle(){
        return this.title;
    }

    /**
     * @param {string} type 
     */
    setType(type){
        if(type == this.info.commands.anime){
            this.type = 1;
        } else {
            this.type = 0;
        }
    }

    getType(){
        return this.type;
    }

    /**
     * data retrives from the api request
     * @param {*json} data 
     */
    setData(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }


}

module.exports = Media;