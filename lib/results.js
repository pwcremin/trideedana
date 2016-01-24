var pinterest = require('./pinterest');
var lowes = require('./lowes');

var pinData = [];

var Products = function()
{
    this.getProductID = function(){
        var productID = pinterest.getBoardsWithPins( function(boards){
            for (var i = 0; i<boards; i++) {
                pinData[i] = boards[i].pins.data;

            }


        });

    }
}

module.exports = new Products(;