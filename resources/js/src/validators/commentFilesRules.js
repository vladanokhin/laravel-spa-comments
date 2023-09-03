import { maxLength } from "@vuelidate/validators";

const commentFormRules = {
    files: {
        maxLength: maxLength(5),
    },
}

export default commentFormRules
