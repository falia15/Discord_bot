class Api {

    constructor(){
        this.res;
    }

    formatItem(item){
        return item.replace(/[ ]/g, '-');
    }

    getData(request){
        var xmlHttp;
        var resp  = '' ;

        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        xmlHttp = new XMLHttpRequest();

        if(xmlHttp != null)
        {
            xmlHttp.open( "GET", request, false );
            xmlHttp.send( null );
            resp = xmlHttp.responseText;
        }

        this.res = JSON.parse(resp);
    }


}

module.exports = Api;