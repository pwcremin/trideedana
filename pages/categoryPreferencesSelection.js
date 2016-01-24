import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PickerIOS,
    PickerItemIOS
} from 'react-native';

var styles = require( './styles' );

import {dispatch} from '../flux/product/dispatcher';
var productConstants = require( '../flux/product/constants' );

var time = {
    name: 'time',
    models: [ 'a few hours', '1 day', '1 weekend' ]
};

var Products = require( './products/products' );
var Back = require( '../components/back' );

var CategoryPreferencesSelection = React.createClass(
    {
        getInitialState()
        {
            return {
                time: null,
                difficulty: null
            }
        },

        onTimeSelection( index )
        {
            this.setState( { time: index } )

            this.navigate();
        },

        onDifficultySelection( index )
        {
            this.setState( { difficulty: index } )

            this.navigate();
        },

        getTimeColor( index )
        {
            return this.state.time === index ? { backgroundColor: "#ff8100", borderColor: "#ff8100" } : null;
        },

        getDiffColor( index )
        {
            return this.state.difficulty === index ? { backgroundColor: "#ff8100", borderColor: "#ff8100" } : null;
        },

        navigate()
        {
            if ( this.state.difficulty != null && this.state.time != null ) {
                dispatch( {
                    type: productConstants.SETCATEGORYPREFERENCES,
                    time: this.state.time,
                    difficulty: this.state.difficulty,
                } );

                this.setState( {
                    time: null,
                    difficulty: null
                } );

                this.props.navigator.push( {
                    component: Products
                } )
            }
        },

        getTimeButton( text, index )
        {
            return <TouchableHighlight

                onPress={this.onTimeSelection.bind(null, index)} underlayColor='#ced5db'

            >
                <View style={[styles.button, this.getTimeColor(index)]}>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        },

        getDiffButton( text, index )
        {
            return <TouchableHighlight

                onPress={this.onDifficultySelection.bind(null, index)} underlayColor='#b0bcc3'

            >
                <View style={[styles.button, this.getDiffColor(index)]}>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        },

        render()
        {
            return (
                <View style={styles.container}>
                    <Back {...this.props}/>
                    <View style={styles.categoryPrefButtonContainer}>
                        <View style={[styles.categoryPrefButtonContainer, {backgroundColor: '#ced5db'}]}>
                            <View style={styles.choicesText}>
                                <Text style={styles.questionText}>How much time do you want to spend?</Text>
                            </View>
                            <View style={styles.categoryPrefChoicesContainer}>
                                {this.getTimeButton( <Text style={styles.answerText}>HOURS</Text>, 0 )}
                                {this.getTimeButton( <Text style={styles.answerText}>DAY</Text>, 1 )}
                                {this.getTimeButton( <Text style={styles.answerText}>WEEKEND</Text>, 2 )}

                            </View>
                        </View>
                        <View style={[styles.categoryPrefButtonContainer, {backgroundColor: '#b0bcc3'}]}>
                            <View style={styles.choicesText}>
                                <Text style={styles.questionText}>What skill level are you?</Text>
                            </View>
                            <View style={styles.categoryPrefChoicesContainer}>
                                {this.getDiffButton( <Text style={styles.answerText}>BEGINNER</Text>, 0 )}
                                {this.getDiffButton( <Text style={styles.answerText}>MEDIAL</Text>, 1 )}
                                {this.getDiffButton( <Text style={styles.answerText}>ADVANCED</Text>, 2 )}
                            </View>

                        </View>
                    </View>
                </View>



            )
        }
    } )

module.exports = CategoryPreferencesSelection;
