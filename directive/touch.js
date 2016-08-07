(function() {
    app.directive('touchStart', [touchStart]);
    function touchStart() {
        return function (scope, element, attr) {

            element.on('touchstart', function (event) {
                scope.$event = event;
                scope.$apply(function () {
                    scope.$eval(attr.touchStart);
                });
            });
        }
    }
    app.directive('touchEnd', [touchEnd]);
    function touchEnd() {
        return function (scope, element, attr) {

            element.on('touchend', function (event) {
                scope.$event = event;
                scope.$apply(function () {
                    scope.$eval(attr.touchEnd);
                });
            });
        }
    }
})();