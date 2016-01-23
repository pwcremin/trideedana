/**
 * Created by patrickcremin on 1/22/16.
 */

var appid = "4814206971909515818";
var appsecret = "c1075a0c38c20ff642df46dfc63d90a1c1eb08646a1cfd3f14c7e903c090f49b";
var accessToken = "ActpTt1Jn2B9R4pWPEYFAy5dbimIFCwcWobRtmhCz3_O78BAKAAAAAA";


var Pinterest = function()
{
    var _host = "https://api.pinterest.com/v1";

    this.getBoards = function(callback)
    {
        var url = _host + "/me/boards/";

        get(url, callback)
    };

    function get( requestUrl, callback )
    {
        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log('GET: ' + requestUrl);

        return fetch( requestUrl)
            .then( ( response ) =>
            {
                response.text().then( function ( text )
                {
                    var json = text != '' ? JSON.parse( text ) : {};

                    callback( json, response.status );
                } );

                response.json().then( function ( xx )
                {
                    console.log( xx )
                } )
            } )
            .catch( ( error ) =>
            {
                console.log( "SPOTIFY GET ERROR: " + error );
            } );
    }

    function post ( requestUrl, body, callback )
    {

        log( 'Post', requestUrl );

        return fetch( requestUrl, {
            method: 'POST',
            headers: {
                'access_token': _accessToken
            },
            body: JSON.stringify( body )
        } )
            .then( ( response ) =>
            {
                return response.json()
            } )
            .then( ( responseJson ) =>
            {
                callback && callback( responseJson )
            } )
            .catch( ( error ) =>
            {
                console.warn( error );
            } );
    }

    function put ( requestUrl, body, callback )
    {
        return fetch( requestUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _accessToken
            },
            body: JSON.stringify( body )
        } )
            .then( ( response ) =>
            {
                callback(null, response.status);
            } )
            .catch( ( error ) =>
            {
                callback(error);
            } );
    }
};

module.exports = new Pinterest();
