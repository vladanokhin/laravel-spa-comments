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
    const allowedTags = ['a', 'i', 'code', 'strong'];
    const allowedTagsRegex = /<(a|code|i|strong)(\s+[a-zA-Z]+="[^"]*")*\s*>[\s\S]*?<\/\1>/g
    const tagPattern = /<\/?([a-zA-Z0-9]+)(?:[^>]*?)>/g;
    const unclosedTags = [];

    const result = text.replace(tagPattern, (match, tagName) => {
        const lowerTagName = tagName.toLowerCase();
        if (!allowedTags.includes(lowerTagName)) {
            return false
        }

        if (match.startsWith("</")) {
            if (unclosedTags.length === 0) {
                unclosedTags.push(lowerTagName);
            } else {
                const lastUnclosed = unclosedTags.pop();
                if (lastUnclosed !== lowerTagName) {
                    return false
                }
            }
        } else {
            unclosedTags.push(lowerTagName);
        }

        return true;
    });

    return unclosedTags.length > 0 ? false : result && allowedTagsRegex.test(text)
}

function valid(html) {


}

export {
    mimes,
    fileSize,
    htmlTags,
}
