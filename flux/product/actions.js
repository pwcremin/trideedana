var constants = require( './constants' );

export type Action =
    {
        type: constants.SETCATEGORY,
        name: name,
    } |
    {
        type: 'link/noop',
        text: string,
    };