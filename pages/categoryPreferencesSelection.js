import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PickerIOS,
    PickerItemIOS
} from 'react-native';

var styles = require( './styles' );

import {dispatch} from '../flux/product/dispatcher';
var productConstants = require( '../flux/product/constants' );

var time = {
    name: 'time',
    models: [ 'a few hours', '1 day', '1 weekend' ]
};

var Products = require('./products/products');

var CategoryPreferencesSelection = React.createClass(
    {
        getInitialState()
        {
            return {
                time: null,
                difficulty: null
            }
        },

        onTimeSelection( index )
        {
            this.setState( { time: index } )

            this.navigate();
        },

        onDifficultySelection( index )
        {
            this.setState( { difficulty: index } )

            this.navigate();
        },

        getTimeColor( index )
        {
            return this.state.time === index ? { backgroundColor: "#ff8100", borderColor: "#ff8100"} : null;
        },

        getDiffColor( index )
        {
            return this.state.difficulty === index ? { backgroundColor: "#ff8100", borderColor: "#ff8100" } : null;
        },

        navigate()
        {
            if(this.state.difficulty != null && this.state.time != null)
            {
                dispatch( {
                    type: productConstants.SETCATEGORYPREFERENCES,
                    time: this.state.time,
                    difficulty: this.state.difficulty,
                } );

                this.setState({
                    time: null,
                        difficulty: null
                });

                this.props.navigator.push({
                    component: Products
                })
            }
        },

        getTimeButton(text, index)
        {
            return <TouchableHighlight
                onPress={this.onTimeSelection.bind(null, index)} underlayColor= 'white'
            >
                <View style={[styles.button, this.getTimeColor(index)]}>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        },

        getDiffButton(text, index)
        {
            return <TouchableHighlight
                onPress={this.onDifficultySelection.bind(null, index)} underlayColor= 'white'
            >
                <View style={[styles.button, this.getDiffColor(index)]}>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        },

        render()
        {
            return (
                <View style={styles.categoryPrefButtonContainer}>
                    <View style={[styles.categoryPrefChoicesContainer, {backgroundColor: 'green'}]}>
                        {this.getTimeButton("a few hours", 0)}
                        {this.getTimeButton("1 day", 1)}
                        {this.getTimeButton("1 weekend", 2)}
                    </View>

                    <View style={styles.categoryPrefChoicesContainer}>
                        {this.getDiffButton("beginner", 0)}
                        {this.getDiffButton("intermediate", 1)}
                        {this.getDiffButton("advanced", 2)}
                    </View>
                </View>


            )
        }
    } )

module.exports = CategoryPreferencesSelection;
