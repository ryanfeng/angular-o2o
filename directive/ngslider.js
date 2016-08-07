angular.module("ngSlide", []).directive("slider", ['$timeout', function ($timeout) {
    function buildTit(num) {
        var html = "";
        for (var i = 0; i < parseInt(num); i++) {
            html += '<span class="li"></span>'
        }
        return html;
    }

    return {
        restrict: 'A',
        replace: true,
        scope: {
            id: '@id',
            effect: '@effect',
            delayTime: "@delayTime",
            interTime: '@interTime',
            defaultIndex: '@defaultIndex',
            titCell: '@titCell',
            trigger: '@trigger',
            scroll: '@scroll',
            vis: '@vis',
            titOnClassName: '@titOnClassName',
            autoPage: '@autoPage',
            prevCell: '@prevCell',
            nextCell: '@nextCell',
            number: '@number',
            trans: "@trans"
        },
        transclude: true,
        template: "" +
        "<div class='cc tibooslider'>" +
        '<ul class="cc" ng-transclude id="{{ ulid }}"></ul>' +
        '<div class="titCell">' +
        '<div ng-bind-html="ulController | to_trusted" ></div>' +
        '</div>' +
        '<div class="prev"></div>' +
        '<div class="next"></div>' +
        "</div>",
        //templateUrl: 'slider.html'   (if you have localhost)
        link: function (scope, elem, attrs) {
            scope.ulid = scope.id + "ul";
            if (scope.trans) {
                scope.ulController = scope.trans
            } else {
                if (scope.number) {
                    scope.ulController = buildTit(scope.number);
                } else {
                    scope.ulController = "";
                }
            }
            var id = "#" + scope.id;
            var ulid = id + "ul",
                autoPlay = scope.autoPlay || true,
                effect = scope.effect || "fade",
                delayTime = scope.delayTime || 1000,
                interTime = scope.interTime || 5000,
                defaultIndex = scope.defaultIndex || 0,
                titCell = scope.titCell || ".titCell .li",
                trigger = scope.trigger || "click",
                scroll = scope.scroll || 1,
                vis = scope.vis || 1,
                titOnClassName = scope.titOnClassName || "on",
                autoPage = scope.autoPage || false,
                prevCell = ".prev",
                nextCell = ".next";
            $timeout(function () {
                $(id).slide({
                    autoPlay: autoPlay,
                    mainCell: ulid,
                    effect: effect,
                    delayTime: delayTime,
                    interTime: interTime,
                    defaultIndex: defaultIndex,
                    titCell: titCell,
                    trigger: trigger,
                    scroll: scroll,
                    vis: vis,
                    titOnClassName: titOnClassName,
                    autoPage: autoPage,
                    prevCell: prevCell,
                    nextCell: nextCell
                });
                $timeout.cancel();
            })
        }
    }
}]);