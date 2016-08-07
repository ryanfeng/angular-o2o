var app = function () {
    if (isMobile()) {
        return (angular.module("app", ["ngRoute", "angucomplete-alt", "ngCookies", "ngFileUpload", "ui.bootstrap",
            "ui.bootstrap.datetimepicker", "angulartics", "angulartics.baidu", "angulartics.1yingli", "metatags",
            "ngStorage", "ngSlide", 'ngTouch']));
    } else {
        return (angular.module("app", ["ngRoute", "angucomplete-alt", "ngCookies", "textAngular", "angularModalService",
            "ngFileUpload", "ngTagsInput", "ui.bootstrap", "ui.bootstrap.datetimepicker", "angulartics",
            "angulartics.baidu", "angulartics.1yingli", "metatags", "ngStorage", "ngSlide"]));
    }
}();

