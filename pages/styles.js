var React = require( 'react-native' );
var {
    StyleSheet,
    } = React;

const Dimensions = require( 'Dimensions' );
const windowSize = Dimensions.get( 'window' );

var windowWidth = windowSize.width;
var windowHeight = windowSize.height;

var picHeight = Math.floor( windowHeight / 10 )

const DISPLAY_PIC_WIDTH = picHeight * 2 + 10//240 + 10; // the 10 is for the margin of the small pics below (so edges match up)
const PIC_WIDTH = picHeight//120;
const DELETE_IMG_LEFT = 62;
const DELETE_IMG_TOP = 58;

var Styles = StyleSheet.create( {
    displayPicContainer: {
        borderWidth: 1,
    },
    displayPic: {
        borderWidth: 5,
        borderRadius: 7,
        width: DISPLAY_PIC_WIDTH,
        height: DISPLAY_PIC_WIDTH,
        margin: 5,
        padding: 1,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
    },
    displayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        left: 10,
        width: window.width - 40,
        height: 1,
        margin: 10,
        backgroundColor: '#dddddd'
    },
    button: {
        width: 100,
        height: 55,
        backgroundColor: '#fdc058',
        borderColor: '#fdc058',
        borderWidth: 6,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#e29003',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 3},
        margin: 10
    },
    categoryPrefChoicesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: windowWidth
    },
    questionText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    choicesText: {
        position: 'relative',
        left: windowWidth * 0.01,
        marginTop: 50,
        paddingLeft: 15,
        paddingRight: 15

    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: windowWidth,
        height: 30
    },
    categoryPrefButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    productImage:{
        borderWidth: 5,
        borderRadius: 7,
        width: DISPLAY_PIC_WIDTH,
        height: DISPLAY_PIC_WIDTH,
        margin: 5,
        padding: 1,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
    },
    loginContainer: {
        //flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loginButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    textInput: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    //---------------------------------------------------------------
    mainPicContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    bioPic: {
        width: 240,
        height: 240,
        alignSelf: 'center',
        //borderRadius: 5,
    },
    picList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: windowSize.width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainPic: {
        width: DISPLAY_PIC_WIDTH,
        height: DISPLAY_PIC_WIDTH,
        margin: 5,
        padding: 1,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
    },
    mainPicButton: {
        position: 'absolute',
        left: DISPLAY_PIC_WIDTH - DELETE_IMG_LEFT,
        top: DISPLAY_PIC_WIDTH - DELETE_IMG_TOP,
    },
    picButton: {
        position: 'absolute',
        left: PIC_WIDTH - DELETE_IMG_LEFT,
        top: PIC_WIDTH - DELETE_IMG_TOP
    },
    pic: {
        width: PIC_WIDTH,
        height: PIC_WIDTH,
        margin: 5,
        padding: 1,
        alignItems: 'center',
        backgroundColor: '#eaeaea',
    },
    navBar: {
        height: 28,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    navBarImage: {
        resizeMode: 'contain',
        height: 22,
        alignSelf: 'flex-end',
        margin: 3,
    },
    addPhotoText: {
        alignSelf: 'center',
        height: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
        height: 75,
    },
    icon: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 50,
        resizeMode: 'stretch',
        width: 42,
        height: 42,
        alignSelf: 'center'
    },
    titleContainer: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: 20
    }
} );

module.exports = Styles;