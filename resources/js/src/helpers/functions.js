/**
 *
 * @param {Object} _obj
 * @param {Number} id
 */
const deepSearch = (_obj, id) => {
    for(const el of _obj) {
        if(el.id === id)
            return el

        if(el.children.length > 0) {
            const childEl = deepSearch(el.children, id)
            if(childEl?.id === id)
                return childEl
        }

    }
}

/**
 * Scroll to element by id
 * @param {String} id
 */
const scrollToElement = (id) => {
    setTimeout(() => {
        const element = document.getElementById(id)
            if(element)
                element.scrollIntoView({behavior: "smooth"})
    }, 100)
}

export {
    deepSearch,
    scrollToElement,
}
