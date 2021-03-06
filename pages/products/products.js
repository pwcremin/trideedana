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

var ProductDisplay = require( './productDisplay' );
var Back = require( '../../components/back' );

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


        onProductSelection( pin )
        {
            dispatch( {
                type: productConstants.SETPRODUCT,
                pin: pin,
            } );

            this.props.navigator.push( {
                component: ProductDisplay
            } )
        },

        getList()
        {
            var pins = this.state.category ? this.state.category.pins : [];

            var components = [];

            for ( var i = 0; i < pins.length; i++ ) {
                var pin = pins[ i ];

                console.log( "PIN skill: " + pin.data[ "Skill Level" ] );
                console.log( "PIN time: " + pin.data[ "Estimated Time" ] );

                if ( pin.data[ "Skill Level" ] !== this.state.categoryPreferences.difficulty
                    || pin.data[ "Estimated Time" ] !== this.state.categoryPreferences.time ) {
                    continue;
                }

                var name = <Text>{this.state.category.name}</Text>

                var url = pin.image.original.url;

                var image = <Image
                    style={styles.displayPic}
                    source={{uri: url}}
                />

                var description = pin.data[ "Project" ]

                components.push(
                    <View key={i} style={styles.center}>
                        <View style={styles.center}>
                            <Text>{description}</Text>
                        </View>

                            <TouchableHighlight
                                onPress={this.onProductSelection.bind(null, pin)} underlayColor='transparent'
                            >
                                <View key={i} style={styles.displayContainer}>
                                    {image}
                                    <View style={styles.divider}/>
                                </View>
                            </TouchableHighlight>
                    </View>
                )
            }

            return components;
        },

        render()
        {
            var description = this.state.category.pins ? this.state.category.pins[ 0 ].data[ "Project" ] : "";

            return (
            <Image source={require('../../lib/imgs/upwards.png')} style={styles.blueGrad}>    
                <View style={styles.container}>
                    <Back {...this.props}/>
                    <ScrollView>
                        {this.getList()}
                    </ScrollView>
                </View>
            </Image>
            )
        }
    } );

module.exports = Products;