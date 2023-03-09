"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushNoDuplicateItem = exports.stripIp = exports.fuzzyValIsInArray = exports.checkValInArray = exports.delFormatCode = exports.formatDate = exports.wrapAsyncFunc = void 0;
function wrapAsyncFunc(func) {
    return (...args) => {
        setTimeout(() => func(...args).catch((e) => logger.error(String(e))), 0);
    };
}
exports.wrapAsyncFunc = wrapAsyncFunc;
function formatDate(options = {}) {
    const date = options.date ?? new Date();
    const withTime = options.withTime ?? true;
    const yr = date.getFullYear();
    const mon = date.getMonth() + 1;
    const day = date.getDate();
    let formatted = `${yr}-${mon}-${day}`;
    if (withTime) {
        const padNum = (n) => n.toString().padStart(2, '0');
        const hr = date.getHours();
        const min = padNum(date.getMinutes());
        const sec = padNum(date.getSeconds());
        formatted += ` ${hr}:${min}:${sec}`;
    }
    return formatted;
}
exports.formatDate = formatDate;
function delFormatCode(text) {
    return text.replace(/§[0-9abcdefgklmnor]/g, '');
}
exports.delFormatCode = delFormatCode;
function checkValInArray(arr, callback) {
    for (const it of arr)
        if (callback(it))
            return true;
    return false;
}
exports.checkValInArray = checkValInArray;
function fuzzyValIsInArray(arr, val) {
    return checkValInArray(arr, (v) => v.includes(val));
}
exports.fuzzyValIsInArray = fuzzyValIsInArray;
function stripIp(ip) {
    return ip.split(':')[0];
}
exports.stripIp = stripIp;
function pushNoDuplicateItem(list, item) {
    if (!list.includes(item))
        list.push(item);
    return list;
}
exports.pushNoDuplicateItem = pushNoDuplicateItem;
