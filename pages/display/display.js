import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


var pinterest = require( '../../lib/pinterest' );

var Main = React.createClass(
    {
        getInitialState()
        {
            return ({ boards: {} })
        },

        componentDidMount()
        {
            pinterest.getBoards( function ( boards )
            {
                this.setState( { boards: boards } )
            }.bind( this ) )
        },

        onPress()
        {
            this.props.navigator.pop();
        },

        render()
        {
            return (
                <View>
                    <Text>Display</Text>
                    <TouchableHighlight
                        onPress={this.onPress}
                    >
                        <Text>back</Text>
                    </TouchableHighlight>
                </View>

            )
        }
    } );

module.exports = Main;