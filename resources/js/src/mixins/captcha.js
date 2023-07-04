import VueClientRecaptcha from "vue-client-recaptcha";

export default {
    data() {
        return {
            captcha: null,
            isValidCaptcha: null,
            checkedCaptcha: false,
            captchaChars: 'abcdefghijklmnopqrstuvwxyz0123456789'
        }
    },
    methods: {
        setIsValidCaptcha(isValid) {
            this.isValidCaptcha = isValid
        },
        newCaptchaCode(code) {
            this.checkedCaptcha = false;
        },
    },
    components : {
        VueClientRecaptcha,
    },
}
