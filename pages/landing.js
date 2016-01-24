
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
var Login = require('./login');

var Landing = React.createClass(
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

    onLogin()
    {
        this.props.navigator.push({
            component: Login
        });
    },

    render()
    {

        return(
            <View>
                <TouchableHighlight
                    onPress={this.onLogin}
                >
                    <Text>Login</Text>
                </TouchableHighlight>
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
            </View>

        )
    }
})

module.exports = Landing;
