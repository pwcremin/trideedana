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

var CategoryPreferencesSelection = require('../categoryPreferencesSelection');

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );

var Display = React.createClass(
    {
        getInitialState()
        {
            return ({ boards: [] })
        },

        componentDidMount()
        {
            pinterest.getBoardsWithPins( function ( boards )
            {
                this.setState( { boards: boards } )
            }.bind( this ) );
        },

        onBack()
        {
            this.props.navigator.pop();
        },

        onCategorySelection( category )
        {
            dispatch( {
                type: productConstants.SETCATEGORY,
                category: category,
            } );

            this.props.navigator.push({
                component: CategoryPreferencesSelection
            })
        },

        getList()
        {
            var boards = this.state.boards;

            var components = [];

            for ( var i = 0; i < boards.length; i++ ) {
                var board = boards[ i ];

                var name = <Text>{board.name}</Text>

                var image = <View></View>

                if ( board.pins.length > 0 ) {
                    var url = board.pins[ 0 ].image.original.url;

                    image = <Image
                        style={styles.displayPic}
                        source={{uri: url}}>
                        <View style={styles.displayTextContainer}>
                            <Text style={styles.displayText}>{name}</Text>
                        </View>

                        </Image>
                }

                components.push(
                    <View key={i} style={styles.center}>
                        <TouchableHighlight
                            onPress={this.onCategorySelection.bind(null, board)} underlayColor='transparent'
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
            return (
                <Image source={require('../../lib/imgs/upwards.png')} style={styles.blueGrad}>
                <ScrollView>
                    <Text style={styles.introText}>What would you like to work on today?</Text>
                    {this.getList()}
                </ScrollView>
            </Image>

            )
        }
    } );

module.exports = Display;