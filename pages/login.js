/**
 * Created by orodriguez on 1/23/2016.
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

var Selection = require('./selection/selection');
var Display = require('./display/display');
var Purchase = require('./purchase/purchase');

var Login = React.createClass(
    {
        onSelection()
        {
            this.props.navigator.push({
                component: Selection
            } );
        },

        onDisplay()
        {
            this.props.navigator.push({
                component: Display
            } );
        },

        onPurchase()
        {
            this.props.navigator.push({
                component: Purchase
            } );
        },

        render()
        {
            return(
                <View>
                    <Text>SUCCESS</Text>
                    <TouchableHighlight
                        onPress={this.onSelection}
                    >
                        <Text>Selection</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.onDisplay}
                    >
                        <Text>Display</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={this.onPurchase}
                    >
                        <Text>Purchse</Text>
                    </TouchableHighlight>
                </View>

            )
        }
    })

module.exports = Login;
