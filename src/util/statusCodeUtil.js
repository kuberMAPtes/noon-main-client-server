/**
 * @param {number} statusCode 
 */
export function is2xxStatus(statusCode) {
    return getMostSignificantDigit(statusCode) === 2;
}

/**
 * @param {number} statusCode 
 */
export function is3xxStatus(statusCode) {
    return getMostSignificantDigit(statusCode) === 3;
}

/**
 * @param {number} statusCode 
 */
export function is4xxStatus(statusCode) {
    return getMostSignificantDigit(statusCode) === 4;
}

/**
 * @param {number} statusCode 
 */
export function is5xxStatus(statusCode) {
    return getMostSignificantDigit(statusCode) === 5;
}

/**
 * @param {number} statusCode 
 */
function getMostSignificantDigit(number) {
    return Math.round(number / 100);
}