/**
 * Created by patrickcremin on 1/22/16.
 */

var appid = '4814206971909515818';
var appsecret = 'c1075a0c38c20ff642df46dfc63d90a1c1eb08646a1cfd3f14c7e903c090f49b';
var accessToken = 'ActpTt1Jn2B9R4pWPEYFAy5dbimIFCwcWobRtmhCz3_O78BAKAAAAAA';

var _ = require( 'lodash' );

var Pinterest = function ()
{
    var _host = 'https://api.pinterest.com/v1';

    var _self = this;

    //--------------------------------------------------------------------------------------
    // Utility functions
    //--------------------------------------------------------------------------------------

    function noteToJson(note)
    {
        var noteJson = {};

        var parts = note.split(';');
        for ( var i = 0; i < parts.length; i++ ) {
            var part = parts[ i ];

            if(part === "") continue;

            var keyValue = part.split(':');

            if(keyValue[1] == null)
            {
                console.log("ERROR: NOTE IS MALFORMED")
            }

            var key = keyValue[0].trim();
            var value = keyValue[1].trim();

            if(key === "Materials")
            {
                value = value.split(',');
            }

            noteJson[key] = value;
        }

        return noteJson;
    }

    this.getBoardsWithPins = function(callback)
    {
        this.getBoards(function(boards)
        {
            var boardsWithPins = [];

            for ( var i = 0; i < boards.length; i++ ) {
                var board = boards[ i ];

                (function(boardName){
                    _self.getBoardPins(boardName, function(pins)
                    {
                        pins = pins.map(function(pin)
                        {
                            if(!pin.note)
                            {
                                return pin;
                            }

                            pin.data = noteToJson(pin.note)

                            return pin;
                        });

                        boardsWithPins.push({
                            name: boardName,
                            pins: pins
                        });

                        if(boardsWithPins.length === boards.length)
                        {
                            callback(boardsWithPins);
                        }
                    })
                })(board.name)

            }
        })
    };

    //--------------------------------------------------------------------------------------
    // Board API: https://developers.pinterest.com/docs/api/boards/
    //--------------------------------------------------------------------------------------

    this.getBoard = function ( boardName, callback )
    {
        // The default response returns the ID, URL and name of the specified board.

        var url = _host + '/boards/' + boardName + '/';

        get( url, function ( response, status )
        {
            callback( response.data, status );
        } )
    };

    this.getBoards = function ( callback )
    {
        // The default response returns a list of the authenticated user’s public boards, including the URL, ID and name.

        var url = _host + '/me/boards/';

        get( url, function ( response, status )
        {
            callback( response.data, status );
        } )
    };

    this.getBoardPins = function ( boardName, callback )
    {
        // The default response returns a list of Pins on the board with their ID, URL, link and description.

        boardName = boardName.split(' ').join('-');

        console.log("Boardname: " + boardName)

        var url = _host + '/boards/trideedana/' + boardName + '/pins/';

        var params = "fields=id,note,image";

        get( url, function ( response, status )
        {
            callback( response.data, status );
        }, params )
    };

    //--------------------------------------------------------------------------------------
    // Pin API: https://developers.pinterest.com/docs/api/pins/
    //--------------------------------------------------------------------------------------

    this.getPins = function ( boardName, callback )
    {
        // The default response returns the ID, link, URL and description of each of the authenticated user’s Pins.

        var url = _host + '/pins/';

        var params = "fields=id,note,image";

        get( url, function ( response, status )
        {
            callback( response.data, status );
        }, params )
    };

    this.getPin = function ( pinId, callback )
    {
        // The default response returns the ID, link, URL and description of the Pin.

        var url = _host + '/pins/' + pinId + '/';

        var params = "fields=id,note,image";

        get( url, function ( response, status )
        {
            callback( response.data, status );
        }, params )
    };

    function get( requestUrl, callback, params )
    {
        callback = callback || _.noop;

        params = params ? "&" + params : "";

        requestUrl = requestUrl + '?access_token=' + accessToken + params;

        requestUrl = encodeURI(requestUrl);

        console.log( '[Pinterest] GET: ' + requestUrl );

        return fetch( requestUrl )
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

    function post( requestUrl, body, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log( '[Pinterest] POST: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'POST',
            headers: {
                'access_token': _accessToken
            },
            body: JSON.stringify( body )
        } )
            .then( ( response ) =>
            {
                response.json().then( function ( json )
                {
                    callback( json, response.status );
                } )
            } )
            .catch( ( error ) =>
            {
                console.warn( error );
            } );
    }

    function put( requestUrl, body, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?access_token=' + accessToken;

        console.log( '[Pinterest] PUT: ' + requestUrl );

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
                response.json().then( function ( json )
                {
                    callback( json, response.status );
                } )
            } )
            .catch( ( error ) =>
            {
                callback( error );
            } );
    }
};

module.exports = new Pinterest();
