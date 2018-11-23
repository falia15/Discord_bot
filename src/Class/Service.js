/**
 *  Handle all logic method, that can be use in serveral game/features of the bot
 */
class Service {

    /**
     * Return a value inside an array, where the maximum index is the size of the array given as parameter 
     * @param arr, array
     * @return string
     */
    getRandomInArray(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /**
     * Return true if the parameter is a lowercase Alphabetic letter
     * @param {*string} message message send from Discord's Server
     * @return {*bool}
     */
    isLetter(str){
        return str.length === 1 && str.match(/[a-z-éè]/i);
    }

    /**
     * Reproduce the behavior of search function, but in this case it return all occurences in a array
     * Source : https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
     * @param {*string} haystack 
     * @param {*string} neddle 
     * @return {*array}
     */
    strSearchAll(haystack, neddle){
        var result = [];
        for (var i = 0; i < haystack.length; ++i) {
            if (haystack.substring(i, i + neddle.length) == neddle) {
                result.push(i);
            }
        }
        return result;

    }

    /**
     * Replace a letter by the char and at the index position given as parameter
     * Source : https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
     * @param {*string} str 
     * @param {*int} index 
     * @param {*char} chr 
     */
    ReplaceAtIndex(str,index,chr){
        if(index > str.length-1) return str;
        return str.substr(0, index) + chr + str.substr(index+1);
    }

    /**
     * replace all character given as parameter by another caracther, in a string
     * @param {*string} str 
     * @param {*string} find 
     * @param {*string} replace
     * @return {string}
     */
    replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    /**
     * check if array data is undefindd, if not check if the string contain the needle parameter
     * @param {*string} needle 
     * @param {*array} array 
     */
    searchInStrings(needle, array){

        for(var i=0; i<array.length; i++){
            if(array[i] && typeof array[i] != 'undefined'){
                if(array[i].toLowerCase().includes(needle)){
                    return array[i];
                }
            }
        }
        
        return null;

    }



}

module.exports = Service;