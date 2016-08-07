app.directive('sidebarLeft', ['$rootElement', sidebarLeft]);
function sidebarLeft($rootElement) {
    return {
        restrict: 'C',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            $rootElement.addClass('has-sidebar-left');
        }
    }
}

app.directive('sidebarRight', ['$rootElement', sidebarRight]);
function sidebarRight($rootElement) {
    return {
        restrict: 'C',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            $rootElement.addClass('has-sidebar-right');
        }
    }
}


app.directive('openLeft', ['$rootElement', openLeft]);
function openLeft($rootElement) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $rootElement.addClass('sidebar-left-in');
            })
        }
    }
}

app.directive('closeLeft', ['$rootElement', closeLeft]);
function closeLeft($rootElement) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $rootElement.removeClass('sidebar-left-in');
            })
        }
    }
}


app.directive('openRight', ['$rootElement', openRight]);
function openRight($rootElement) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $rootElement.addClass('sidebar-right-in');
            })
        }
    }
}

app.directive('closeRight', ['$rootElement', closeRight]);

function closeRight($rootElement) {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        template: "",
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $rootElement.removeClass('sidebar-right-in');
            })
        }
    }
}