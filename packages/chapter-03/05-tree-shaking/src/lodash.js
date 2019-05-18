import lodash from 'lodash-es';

export function isArray(obj) {
    return lodash.isArray(obj);
}

export function isNull(obj) {
    return null === obj;
}
