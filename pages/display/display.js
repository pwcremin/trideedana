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
var lowes = require( '../../lib/lowes' );
var styles = require( '../styles' );

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

        onPress()
        {
            this.props.navigator.pop();
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
                    <View key={i}>
                        {name}
                        {image}
                    </View>
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
                        onPress={this.onPress}
                    >
                        <Text>back</Text>
                    </TouchableHighlight>
                </View>

            )
        }
    } );

module.exports = Main;