/**
 * Created by patrickcremin on 1/22/16.
 */

var appid = "4814104369439981655";
var appsecret = "73c2de7420d1a4fbb8d347865529a7212ad44c215dfaa1aac89f434f9b09b0e9";
var accessToken = "AbxJJ8GrwTpAPfh4VgEKyC3UnNH-FCvxDzT5_dxCzyUCueBHEgAAAAA";


var Pinterest = function()
{
    var _accessToken = "";

    function get( requestUrl, callback )
    {
        return fetch( requestUrl, {
            headers: {
                'Authorization': 'Bearer ' + _accessToken
            }
        } )
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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + _accessToken
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

module.export = new Pinterest();
