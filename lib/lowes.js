var api_key = "zkc7mc494j4pjqv5bnskypgp";
var access_token = "QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==";

var _ = require( 'lodash' );

var Lowes = function ()
{
    var _host = 'http://api.lowes.com'

    var _authToken = null;
    var _ssoToken = null;
    var _wcToken = null;
    var _wcTrustedToken = null;

    this.login = function ( logonId, logonPassword, callback )
    {
        var url = _host + '/customer/login/';

        var body = {
            "logonId": logonId, //"orod1993@gmail.com",
            "logonPassword": logonPassword, //"fakepass123",
            "x_activityGuid": ""
        };

        post( url, body, function(data)
        {
            _authToken = data.AuthToken;
            _ssoToken = data.SSOToken;
            _wcToken = data.WCToken;
            _wcTrustedToken = data.WCTrustedToken;

            callback(data);
        })
    };

    function get( requestUrl, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?api_key=' + api_key;

        console.log( '[Lowes] GET: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                //'X-Originating-Ip': '66.55.28.237',
                'Content-Type': 'application/json'

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
                console.log( 'ERROR: ' + error );
            } );
    }

    function post( requestUrl, body, callback )
    {
        callback = callback || _.noop;

        requestUrl = requestUrl + '?api_key=' + api_key;

        console.log( '[Lowes] POST: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                //'X-Originating-Ip': '66.55.28.237',
                'Content-Type': 'application/json'

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

        requestUrl = requestUrl + '?api_key=' + api_key;

        console.log( '[Lowes] PUT: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'PUT',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                //'X-Originating-Ip': '66.55.28.237',
                'Content-Type': 'application/json'

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

module.exports = new Lowes();
