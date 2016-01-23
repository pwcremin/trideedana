/**
 * Created by patrickcremin on 1/22/16.
 */

var appid = '4814206971909515818';
var appsecret = 'c1075a0c38c20ff642df46dfc63d90a1c1eb08646a1cfd3f14c7e903c090f49b';
var accessToken = 'ActpTt1Jn2B9R4pWPEYFAy5dbimIFCwcWobRtmhCz3_O78BAKAAAAAA';

var _ = require('lodash');

var Pinterest = function()
{
    var _host = 'https://api.pinterest.com/v1';


    //--------------------------------------------------------------------------------------
    // Board API: https://developers.pinterest.com/docs/api/boards/
    //--------------------------------------------------------------------------------------

    this.getBoard = function(boardName, callback)
    {
        // The default response returns the ID, URL and name of the specified board.

        var url = _host + '/boards/' + boardName + '/';

        get(url, callback)
    };

    this.getBoards = function(callback)
    {
        // The default response returns a list of the authenticated user’s public boards, including the URL, ID and name.

        var url = _host + '/me/boards/';

        get(url, callback)
    };

    this.getBoardPins = function(boardName, callback)
    {
        // The default response returns a list of Pins on the board with their ID, URL, link and description.

        var url = _host + '/boards/' + boardName + '/pins/';

        get(url, callback)
    };

    //--------------------------------------------------------------------------------------
    // Pin API: https://developers.pinterest.com/docs/api/pins/
    //--------------------------------------------------------------------------------------

    this.getPins = function(boardName, callback)
    {
        // The default response returns the ID, link, URL and description of each of the authenticated user’s Pins.

        var url = _host + '/pins/';

        get(url, callback)
    };

    this.getPin = function(pinId, callback)
    {
        // The default response returns the ID, link, URL and description of the Pin.

        var url = _host + '/pins/' + pinId + '/';

        get(url, callback)
    };

    function get( requestUrl, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log('[Pinterest] GET: ' + requestUrl);

        return fetch( requestUrl)
            .then( ( response ) =>
            {
                response.json().then( function ( json )
                {
                    callback( json, response.status );
                } )
            } )
            .catch( ( error ) =>
            {
                console.log( 'ERROR: ' + error );
            } );
    }

    function post ( requestUrl, body, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log('[Pinterest] POST: ' + requestUrl);

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
                callback( responseJson )
            } )
            .catch( ( error ) =>
            {
                console.warn( error );
            } );
    }

    function put ( requestUrl, body, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log('[Pinterest] PUT: ' + requestUrl);

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
