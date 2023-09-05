import {helpers} from "@vuelidate/validators";
import {fileSize, mimes} from "@src/validators/customRules"


const allowedMimeTypes = ['jpeg', 'png', 'gif'],
      maxKb = 5000;

const userAvatarRules = {
    files: {
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

export default userAvatarRules
