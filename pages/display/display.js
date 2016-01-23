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

import {dispatch} from '../../flux/product/dispatcher';
var productConstants = require( '../../flux/product/constants' );

var Main = React.createClass(
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
                        source={{uri: url}}
                    />
                }

                components.push(
                    <TouchableHighlight
                        onPress={this.onCategorySelection.bind(null, board)}
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
                    <Text>Display</Text>
                    {this.getList()}
                    <TouchableHighlight
                        onPress={this.onBack}
                    >
                        <Text>back</Text>
                    </TouchableHighlight>
                </View>

            )
        }
    } );

module.exports = Main;