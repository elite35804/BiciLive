import numeral from 'numeral';
import { isNil, defaultTo } from 'lodash';

function padZero(fmt, pad) {
    if (isNil(pad)) {
        return fmt;
    }
    let newfmt = defaultTo(format, '');
    for (let i = 0; i < pad || 0; i += 1) {
        newfmt += '0';
    }
    return newfmt;
}

function format(num, fmt, decimal) {
    return numeral(num).format(padZero(fmt, decimal));
}

export { format };
