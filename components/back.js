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

var styles = require('../pages/styles');

var Back = React.createClass({

    onPress()
    {
        this.props.navigator.pop();
    },

    render()
    {
        return (
        <TouchableHighlight
            onPress={this.onPress}
        >
            <View style={styles.backContainer}>
                <Image style={styles.back} source={require('../images/back_icon.png')} />
            </View>
        </TouchableHighlight>

        )

    }
});

module.exports = Back;