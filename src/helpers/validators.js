const isPhoneNumber = require('is-chinese-mobile-phone-number');

export const required = txt => {
    return (!!txt && txt.length > 0);
}

export const isValidPhone = txt => {
    return isPhoneNumber(txt);
}

export const isLength = len => txt => {
    return (!!txt && txt.length === len);
}