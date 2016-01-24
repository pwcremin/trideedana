var pinterest = require( './pinterest' );
var lowes = require( './lowes' );

var pinData = [];

var Products = function ()
{
    this.createListFromPin = function(pin)
    {
        this.getProductIdsForPin(pin.data["Materials"], function(productResults)
        {
            var productIds = productResults.map(function(productResults)
            {
                var id = productResults.productList.length > 0 ? productResults.productList[0] : null;
            })

            lowes.createList(pin.data["Project"], pin.data["Description"], function()
            {

            })
        });
    };

    this.getProductIdsForPin = function(keywords, callback)
    {
        lowes.getProductIDs(keywords, function(ids)
        {
            callback(ids)
        });
    };

    this.getProductID = function ()
    {
        var productID = pinterest.getBoardsWithPins( function ( boards )
        {
            for ( var i = 0; i < boards; i++ ) {
                pinData[ i ] = boards[ i ].pins.data;

            }


        } );

    }
};

module.exports = new Products()