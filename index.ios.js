/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    StatusBarIOS
} from 'react-native';

var Landing = require( './pages/landing' );
var Login = require( './pages/login' );


StatusBarIOS.setHidden(true);
StatusBarIOS.setNetworkActivityIndicatorVisible(false);

var Trideedana = React.createClass( {

    renderScene: function ( route, navigator )
    {
        return <route.component route={route} navigator={navigator}/>;
    },

    render() {
        return (
            <Navigator
                //initialRoute={{component: Landing}}
                initialRoute={{component: Login}}
                renderScene={this.renderScene}
            />
        )
    }
} );

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
} );

AppRegistry.registerComponent( 'trideedana', () => Trideedana );
