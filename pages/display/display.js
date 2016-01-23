import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';


var pinterest = require( '../../lib/pinterest' );
var lowes = require( '../../lib/lowes' );

var Main = React.createClass(
    {
        getInitialState()
        {
            return ({ boards: {} })
        },

        componentDidMount()
        {
            lowes.login( "orod1993@gmail.com", "fakepass123", function ( data )
            {
                console.log( data );

                lowes.createList("please work!", "bmx", function(list)
                {
                    console.log(list);

                    lowes.getAllLists(function(lists)
                    {
                        console.log(lists.length);

                        lowes.getListItems(lists[0].id, function(items)
                        {
                            console.log(items);
                        })
                    })
                })
            } );

            pinterest.getBoards( function ( boards )
            {
                this.setState( { boards: boards } )
            }.bind( this ) )
        },

        onPress()
        {
            this.props.navigator.pop();
        },

        render()
        {
            return (
                <View>
                    <Text>Display</Text>
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