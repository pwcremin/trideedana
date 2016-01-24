var constants = require( './constants' );

export type Action =
    {
        type: constants.SETCATEGORY,
        category: object,
    } |
    {
        type: constants.SETCATEGORYPREFERENCES,
        time: int,
        difficulty: int,
    } |
    {
        type: constants.SETPRODUCT,
        pin: pin,
    } |
    {
        type: 'link/noop',
        text: string,
    };