import moment from 'moment';

function dayOfWeek(date) {
    const mdate = moment(date || new Date());
    return parseInt(mdate.format('e'), 10);
}

function daysAgo(date) {
    const mdate = moment(date).startOf('day');
    const mtoday = moment().startOf('day');
    if (mdate.isSame(mtoday)) {
        return 'Today';
    }
    const myesterday = mtoday.clone().add(-1, 'days');
    if (mdate.isSame(myesterday)) {
        return 'Yesterday';
    }
    let diff = mtoday.diff(mdate, 'months');
    if (diff === 1) {
        `${diff} month ago`;
    } else if (diff > 0) {
        return `${diff} months ago`;
    }
    diff = mtoday.diff(mdate, 'days');
    return `${diff} days ago`;
}

export { dayOfWeek, daysAgo };
