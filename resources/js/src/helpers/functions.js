/**
 *
 * @param {Object} _obj
 * @param {Number} id
 */
const deepSearch = (_obj, id) => {
    for(const el of _obj) {
        if(el.id === id)
            return el

        if(el.children.length > 0)
            return deepSearch(el.children, id)
    }
}

export {
    deepSearch
}
