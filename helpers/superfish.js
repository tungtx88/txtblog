if (typeof(window) !== 'undefined') {
    window.jQuery = require("jquery")
    require("hoverintent-jqplugin")(window.jQuery)
    require("superfish")
    require(".././node_modules/superfish/src/js/supersubs")
}