
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


var Main = React.createClass(
    {
        onPress()
        {
            this.props.navigator.pop();
        },

        render()
        {
            return(
                <View>
                    <Text>Selection</Text>
                    <TouchableHighlight
                        onPress={this.onPress}
                    >
                        <Text>back</Text>
                    </TouchableHighlight>
                </View>

            )
        }
    });

module.exports = Main;