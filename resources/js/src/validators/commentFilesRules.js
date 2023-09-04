import { maxLength, helpers } from "@vuelidate/validators";
import {fileSize, mimes} from "@src/validators/customRules"


const allowedMimeTypes = ['txt'],
      maxKb = 100;

const commentFormRules = {
    files: {
        maxLength: maxLength(5),
        mimes: helpers.withMessage(
            `Only the following file types are allowed: ${allowedMimeTypes.toString()}`,
            mimes(allowedMimeTypes)
        ),
        fileSize:helpers.withMessage(
            `File size should not exceed ${maxKb}kb`,
            fileSize(maxKb)
        ),

    },
}

export default commentFormRules
