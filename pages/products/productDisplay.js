import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    ScrollView,
    ActivityIndicatorIOS
} from 'react-native';


var pinterest = require( '../../lib/pinterest' );
var styles = require( '../styles' );
var results = require( '../../lib/results' );

var CategoryPreferencesSelection = require( '../categoryPreferencesSelection' );
var Back = require( '../../components/back' );
var Receipt = require( './receipt' );

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );
var productStore = require( '../../flux/product/store' );

function getProductState()
{
    return {
        pin: productStore.getProduct(),
        animating: false,
        layout: { width: 100, height: 100 }
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
            this.setState( { animating: true } );

            results.createListFromPin( this.state.pin, function ()
            {
                this.setState( { animating: false } );

                this.props.navigator.replace( {
                    component: Receipt
                } )
            }.bind( this ) );
        },

        onBack()
        {
            this.props.navigator.pop();
        },

        onLayout: function ( event )
        {
            this.setState( { layout: event.nativeEvent.layout } );
        },

        render()
        {
            return (
                <View style={styles.container} onLayout={this.onLayout}>
                    <Back {...this.props}/>
                    <ScrollView>
                        <View style={styles.pinImageContainer}>
                            <Image style={styles.pinImage}
                                   source={{uri: this.state.pin.image.original.url}}/>

                        </View>

                        <Text>{this.state.pin.data[ "Project" ]}</Text>


                        <Text>Difficulty: {this.state.pin.data[ "Skill Level" ]}</Text>
                        <Text>Time: {this.state.pin.data[ "Estimated Time" ]}</Text>
                        <Text>Materials: {this.state.pin.data[ "Materials" ]}</Text>

                        <TouchableHighlight
                            onPress={this.onCreateList} underlayColor='transparent'
                        >
                            <View style={styles.button}>
                                <Text>Create List</Text>
                            </View>

                        </TouchableHighlight>

                    </ScrollView>
                    <ActivityIndicatorIOS
                        animating={this.state.animating}
                        style={{
                        position: 'absolute',
                        top: this.state.layout.height * 0.5,
                        left: this.state.layout.width * 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                        size="large"
                    />
                </View>

            )
        }
    } );

module.exports = ProductDisplay;