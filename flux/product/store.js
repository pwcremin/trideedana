/**
 * Created by patrickcremin on 8/31/15.
 */
var dispatcher = require('./dispatcher');
var constants = require( './constants' );
var utils = require('flux/utils');

var _category = null;

function setCategory( category )
{
    _category = category;
}

class ProductStore extends utils.Store {

    getCategory()
    {
        return _category;
    }

    __onDispatch = function(action)
    {
        switch ( action.type ) {
            case constants.SETCATEGORY:
                setCategory(action.url);
                this.__emitChange();
                break;

            default:
                // no op
        }
    };
}

module.exports = new ProductStore(dispatcher.default);