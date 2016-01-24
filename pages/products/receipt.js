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

var Display = require( '../../pages/styles' );

var Receipt = React.createClass( {

    onPress()
    {
        this.props.navigator.replace( {
            component: Display
        } );
    },

    render()
    {
        return (
            <View>
                <TouchableHighlight
                    onPress={this.onPress}
                >
                    <View style={styles.backContainer}>
                        <Text>here</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )

    }
} );

module.exports = Receipt;