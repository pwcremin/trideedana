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
        var url = _host + '/customer/login?api_key=' + api_key;

        var body = {
            "logonId": logonId, //"orod1993@gmail.com",
            "logonPassword": logonPassword, //"fakepass123",
            "x_activityGuid": ""
        };

        fetch( url, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify( body )
        } )
            .then( ( response ) =>
            {
                response.json().then( function ( data )
                {
                    if(response.status !== 200)
                    {
                        callback("error", null, status);
                        return;
                    }

                    _authToken = data.AuthToken;
                    _ssoToken = data.SSOToken;
                    _wcToken = data.WCToken;
                    _wcTrustedToken = data.WCTrustedToken;

                    callback(data, response.status);
                } )
            } )
            .catch( ( error ) =>
            {
                console.log( 'ERROR: ' + error );
            } );
    };

    this.createList = function(name, noteText, callback)
    {
        //http://api.lowes.com/user/list?name=testlist&note.text=awesome&api_key=zkc7mc494j4pjqv5bnskypgp

        var url = _host + "/user/list?name=" + name + '&note.text=' + noteText + '&api_key=' + api_key;

        post(url, {}, callback)
    };

    this.getAllLists = function(callback)
    {
        //http://api.lowes.com/user/list?api_key=zkc7mc494j4pjqv5bnskypgp

        var url = _host + '/user/list?api_key=' + api_key;

        get(url, callback)
    };

    this.getListItems = function( folderId, callback)
    {
        //http://api.lowes.com/user/list/listitems?folderId=146892418&api_key=zkc7mc494j4pjqv5bnskypgp

        var url = _host + '/user/list/listitems?folderId=' + folderId + '&api_key=' + api_key;

        get(url, callback);
    }

    function get( requestUrl, callback )
    {
        callback = callback || _.noop;

        console.log( '[Lowes] GET: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                'Ssotoken': _ssoToken,
                //'X-Originating-Ip': '66.55.28.237',
            }
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

        console.log( '[Lowes] POST: ' + requestUrl );

        return fetch( requestUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Basic QWRvYmU6ZW9pdWV3ZjA5ZmV3bw==',
                'Ssotoken': _ssoToken,
                //'X-Originating-Ip': '66.55.28.237',
                'Content-Type': 'application/json',
                'Accept': 'application/json'

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

// TODO temp, remove when Oliver writes the login page
var lowes = new Lowes();
lowes.login( "orod1993@gmail.com", "fakepass123");

module.exports = new Lowes();
