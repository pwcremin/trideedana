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


var pinterest = require( '../../lib/pinterest' );
var styles = require( '../styles' );
var results = require('../../lib/results');

var CategoryPreferencesSelection = require( '../categoryPreferencesSelection' );
var Back = require('../../components/back');

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );
var productStore = require( '../../flux/product/store' );

function getProductState()
{
    return {
        pin: productStore.getProduct()
    }
}

var ProductDisplay = React.createClass(
    {
        getInitialState()
        {
            return (getProductState())
        },

        ccomponentDidMount()
        {
            productStore.addListener( this.onChange );
        },

        onChange()
        {
            this.setState( getpinState() )
        },

        onCreateList()
        {
            results.createListFromPin(this.state.pin);
        },

        onBack()
        {
            this.props.navigator.pop();
        },

        render()
        {
            return (
                <View style={styles.container}>
                    <Back {...this.props}/>
                <ScrollView>
                    <View style={styles.pinImageContainer}>
                        <Image style={styles.pinImage}
                               source={{uri: this.state.pin.image.original.url}}/>

                    </View>

                    <Text>{this.state.pin.data["Project"]}</Text>


                    <Text>Difficulty: {this.state.pin.data["Skill Level"]}</Text>
                    <Text>Time: {this.state.pin.data["Estimated Time"]}</Text>
                    <Text>Materials: {this.state.pin.data["Materials"]}</Text>

                    <TouchableHighlight
                        onPress={this.onCreateList} underlayColor='transparent'
                    >
                        <View style={styles.button}>
                            <Text>Create List</Text>
                        </View>

                    </TouchableHighlight>

                </ScrollView>
                    </View>

            )
        }
    } );

module.exports = ProductDisplay;