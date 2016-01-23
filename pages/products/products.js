import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';


var pinterest = require( '../../lib/pinterest' );
var styles = require( '../styles' );

var CategoryPreferencesSelection = require('../categoryPreferencesSelection');

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );
var productStore = require( '../../flux/product/store' );

function getProductState()
{
    return {
        category: productStore.getCategory(),
        categoryPreferences: productStore.getCategoryPreferences()
    }
}

var Products = React.createClass(
    {
        getInitialState()
        {
            return (getProductState())
        },

        ccomponentDidMount()
        {
            productStore.addListener(this.onChange);
        },

        onChange()
        {
            this.setState(getProductState())
        },

        onBack()
        {
            this.props.navigator.pop();
        },


        onProductSelection()
        {

        },

        getList()
        {
            var pins = this.state.category ? this.state.category.pins : [];

            var components = [];

            for ( var i = 0; i < pins.length; i++ ) {
                var pin = pins[ i ];

                var name = <Text>{this.state.category.name}</Text>

                var url = pin.image.original.url;

                var image = <Image
                    style={styles.displayPic}
                    source={{uri: url}}
                />

                components.push(
                    <TouchableHighlight
                        onPress={this.onProductSelection.bind(null, pin)}
                    >
                        <View key={i} style={styles.displayContainer}>
                            {image}
                            {name}
                            <View style={styles.divider}/>
                        </View>
                    </TouchableHighlight>
                )
            }

            return components;
        },

        render()
        {
            return (
                <View>
                    <Text>category {this.state.category.name}</Text>
                    <Text>diff {this.state.categoryPreferences.difficulty}</Text>
                    <Text>time {this.state.categoryPreferences.time}</Text>
                    {this.getList()}
                </View>

            )
        }
    } );

module.exports = Products;