import { helpers } from '@vuelidate/validators'


const mimesTypes = {
    txt:   'text/plain',
    jpeg:  'image/jpeg',
    png:   'image/png',
    gif:   'image/gif',
}

/**
 * Check the mime type of uploaded files
 * @param types
 * @return {(function(*): (boolean))|*}
 */
function mimes(types) {
    return function(files) {
        if (!helpers.req(files))
            return true

        const allowedTypes = Object.keys(mimesTypes)
                .filter( el => types.includes(el) )
                .reduce((obj, key) => {
                    obj[key] = mimesTypes[key];
                    return obj;
                }, {})

        for (const file of files) {
            if(!Object.values(allowedTypes).includes(file.type)) {
                return false
            }
        }

        return true
    }
}

/**
 * Check the file size in kb
 * @param kb
 * @return {(function(*): (boolean))|*}
 */
const fileSize = (kb) => (files) => {
    const maxBytes = parseInt(kb) * 1024

    for (const file of files) {
        if(file.size > maxBytes)
            return false
    }

    return true
}

const htmlTags = (text) => {
    const allowedTagsRegex = /<(a|code|i|strong)(\s+[a-zA-Z]+="[^"]*")*\s*>[\s\S]*?<\/\1>/g;
    const htmlTagRegex = /<[^>]+>/g;
    const htmlTags = text.match(htmlTagRegex);

    if(!htmlTags)
        return true

    // Checking for closing html tags in text
    if(text.search(/<([^>]+)(\s+[a-zA-Z]+="[^"]*")*\s*>[\s\S]*?<\/\1>/g) === -1) {
        return false
    }

    // Checking each tag to see if it is one of the available ones
    for (const tag of htmlTags) {
        if (tag.search(/<\/?(a|code|i|strong)(\s+[a-zA-Z]+="[^"]*")*\s*>/g) === -1) {
            return false
        }
    }

    // Check all text for correct tags
    return allowedTagsRegex.test(text)
}

export {
    mimes,
    fileSize,
    htmlTags,
}
