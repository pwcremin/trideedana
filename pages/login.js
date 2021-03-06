/**
 * Created by orodriguez on 1/23/2016.
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Image
} from 'react-native';

var styles = require( './styles' );

var Landing = require( './landing' );
var Display = require( './display/display' );

var lowes = require( '../lib/lowes' );

var Login = React.createClass(
    {

        getInitialState()
        {
            return {
                username: null,
                password: null
            }

        },

        componentWillMount()
        {
            //this.props.navigator.push({
            //    component: Display
            //} );
        },

        onEndEditingUser( event )
        {
            var value = event.nativeEvent.text;

            this.setState( { username: value } )
        },

        onEndEditingPassword ( event )
        {
            var value = event.nativeEvent.text;

            this.setState( { password: value } )
        },

        onPress()
        {
            this.props.navigator.replace({
                component: Display
            } );
        },

        render()
        {
            return (
            <Image source={require('../lib/imgs/upwards.png')} style={styles.blueGrad}>    
                <View style={styles.loginContainer}>

                    <Image style={styles.logo} source={require('../images/logo2.png')} />

                    <View style={styles.loginButtonContainer}>
                        <TextInput
                            ref="username"
                            style={styles.textInput}
                            placeholder="     username"
                            onEndEditing={this.onEndEditingUser}
                        />

                        <TextInput
                            ref="password"
                            style={styles.textInput}
                            placeholder="     password"
                            onEndEditing={this.onEndEditingPassword}
                        />

                        <TouchableHighlight
                            onPress={this.onPress}
                        >
                            <View style={styles.button}>
                                <Text style={styles.answerText}>LOGIN</Text>
                            </View>
                        </TouchableHighlight>


                    </View>
                <Image style={styles.logo} source={require('../images/poweredby.png')} />

                </View>
            </Image>

            )
        }
    } )

module.exports = Login;
