import {alphaNum, email, helpers, maxLength, minLength, required, url} from "@vuelidate/validators";
import {htmlTags} from "@src/validators/customRules.js";

const commentFormRules = {
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30),
        alphaNum,
    },
    email: {
        required,
        email
    },
    url: { url },
    message: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(250),
        htmlTags: helpers.withMessage(
            'Invalid html in the text',
            htmlTags(['a', 'i', 'code', 'strong'])
        ),
        $autoDirty: true,
    },
}

export default commentFormRules
