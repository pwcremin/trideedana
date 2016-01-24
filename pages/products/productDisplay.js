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

var CategoryPreferencesSelection = require( '../categoryPreferencesSelection' );

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );
var productStore = require( '../../flux/product/store' );

function getProductState()
{
    return {
        product: productStore.getProduct()
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
            this.setState( getProductState() )
        },

        onBack()
        {
            this.props.navigator.pop();
        },

        render()
        {
            return (
                <ScrollView>
                    <Text>{this.state.product.data["Project"]}</Text>
                    <Image style={styles.productImage}
                           source={{uri: this.state.product.image.original.url}}/>

                    <TouchableHighlight
                        onPress={this.onBack}
                    >
                        <Text>back</Text>
                    </TouchableHighlight>

                </ScrollView>

            )
        }
    } );

module.exports = ProductDisplay;