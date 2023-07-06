import { alphaNum, email, maxLength, minLength, required, url } from "@vuelidate/validators";

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
    url: { required },
    message: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(250),
    },
}

export default commentFormRules
