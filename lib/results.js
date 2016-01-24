var pinterest = require( './pinterest' );
var lowes = require( './lowes' );

var pinData = [];

var Products = function ()
{
    this.createListFromPin = function(pin, callback)
    {
        this.getProductIdsForPin(pin.data["Materials"], function(productResults)
        {
            var productIds = productResults.map(function(productResults)
            {
                var id = productResults.productList.length > 0 ? productResults.productList[0] : null;

                return id;
            })

            lowes.createList(pin.data["Project"], pin.data["Description"], function(listData)
            {
                function addItems( productIds )
                {
                    if ( productIds.length === 0 ) {
                        callback();
                        return;
                    }

                    var current = productIds[ 0 ];
                    productIds = productIds.slice( 1 )

                    if(current === null)
                    {
                        // TODO cant create the item
                        addItems(productIds);
                        return;
                    }

                    var listId = listData.folder.id;
                    var productId = current.productId;
                    var productName = current.brand + ' ' + current.description;

                    productName = productName.slice(0, 99);

                    lowes.addItemsToList(listId, productId, productName, function(data)
                    {
                        addItems(productIds);
                    });

                    _self.getProductID( keyword, function ( id )
                    {
                        productIds.push( id );

                        setTimeout( getIds.bind( this, keywords ), 500 );
                    } )
                }

                addItems(productIds);
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