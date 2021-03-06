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
            this.setState( getProductState() )
        },

        onCreateList()
        {
            this.setState( { animating: true } );

            results.createListFromPin( this.state.pin, function (listId, productIds)
            {
                this.setState( { animating: false } );

                this.props.navigator.replace( {
                    component: Receipt,
                    productIds: productIds,
                    listId: listId
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
            <Image source={require('../../lib/imgs/upwards.png')} style={styles.blueGrad}>   
                <View style={styles.container} onLayout={this.onLayout}>
                    <Back {...this.props}/>
                    <ScrollView>
                        <View style={styles.pinImageContainer}>
                            <Image style={styles.pinImage}
                                   source={{uri: this.state.pin.image.original.url}}/>

                        </View>

                        <Text style={styles.productDisplayTitle}>{this.state.pin.data[ "Project" ]}</Text>

                        <Text style={styles.productDisplayLabel}>Description: <Text style={styles.productDisplayText}>{this.state.pin.data[ "Description" ]}</Text></Text>
                        <Text style={styles.productDisplayLabel}>Difficulty: <Text style={styles.productDisplayText}>{this.state.pin.data[ "Skill Level" ]}</Text></Text>
                        <Text style={styles.productDisplayLabel}>Time: <Text style={styles.productDisplayText}>{this.state.pin.data[ "Estimated Time" ]}</Text></Text>
                        <Text style={styles.productDisplayLabel}>Materials: <Text style={styles.productDisplayText}>{this.state.pin.data[ "Materials" ]}</Text></Text>
                        <Text style={styles.productDisplayLabel}>Tools: <Text style={styles.productDisplayText}>{this.state.pin.data[ "Tools" ]}</Text></Text>                        

                        <TouchableHighlight
                            onPress={this.onCreateList} underlayColor='transparent'
                        >
                            <View style={styles.buttonList}>
                                <Text style={styles.answerText}>CREATE LIST</Text>
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
                        size="large"/>
                </View>
                </Image>

            )
        }
    } );

module.exports = ProductDisplay;