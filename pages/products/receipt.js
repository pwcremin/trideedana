import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';

var styles = require( '../../pages/styles' );

var Display = require( '../display/display' );

var lowes = require( '../../lib/lowes' );


var Receipt = React.createClass( {
    onPress()
    {
        this.props.navigator.push( {
            component: Display
        } );
    },

    getReceipt()
    {
        var productIds = this.props.route.productIds;

        var items = productIds.map( function ( productId )
        {
            var item = {
                description: productId.description,
                price: productId.networkPrice,
                url: productId.imageUrls.lg
            };

            return item;
        } )

        var components = [];

        for ( var i = 0; i < items.length; i++ ) {
            var item = items[ i ];

            var color = i % 2 === 0 ? 'lightgrey' : 'white';

            components.push(
                <View key={i} style={{
                    backgroundColor: color
                }}>
                    <Text>{item.description}</Text>
                    <Text>${item.price}</Text>
                </View> )
        }

        return components;
    },

    render()
    {
        return (
        <Image source={require('../../lib/imgs/upwards.png')} style={styles.blueGrad}>        
            <View>
                <TouchableHighlight
                    onPress={this.onPress}
                >
                    <View style={styles.button}>
                        <Text>Done</Text>
                    </View>

                </TouchableHighlight>
                {this.getReceipt()}
            </View>
        </Image>
        )

    }
} );

module.exports = Receipt;