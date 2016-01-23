/**
 * Created by patrickcremin on 8/31/15.
 */
var dispatcher = require( './dispatcher' );
var constants = require( './constants' );
var utils = require( 'flux/utils' );

var _category = null;

var _prefs = {
    time: null,
    difficulty: null
};

var _timeValues = [ 'Few Hours', '1 day', '1 Weekend' ];
var _difficultyValues = [ 'Beginner', 'Intermediate', 'Advanced' ];

function setCategory( category )
{
    _category = category;
}

function setCategoryPrefs( timeIndex, difficultyIndex )
{
    _prefs.time = _timeValues[ timeIndex ];
    _prefs.difficulty = _difficultyValues[ difficultyIndex ];
}

class ProductStore extends utils.Store {

    getCategory()
    {
        return _category;
    }

    getCategoryPreferences()
    {
        return _prefs;
    }

    __onDispatch = function ( action )
    {
        switch ( action.type ) {
            case constants.SETCATEGORY:
                setCategory( action.category );
                this.__emitChange();
                break;

            case constants.SETCATEGORYPREFERENCES:
                setCategoryPrefs( action.time, action.difficulty );
                this.__emitChange();
                break;

            default:
            // no op
        }
    };
}

module.exports = new ProductStore( dispatcher.default );