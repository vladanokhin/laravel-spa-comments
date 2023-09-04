import {Tooltip} from "bootstrap";

export default {
    methods: {
        initTooltips(selectors) {
            const elements = document.querySelectorAll(selectors)
            for (let element of elements) {
                new Tooltip(element)
            }
        },
    }
}
