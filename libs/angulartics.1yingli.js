(function (angular) {
    'use strict';

    /**
     * @ngdoc overview
     * @name angulartics.baidu
     * Enables analytics support for baidu (http://tongji.baidu.com)
     */
    angular.module('angulartics.1yingli', ['angulartics'])
        .config(['$analyticsProvider', function ($analyticsProvider) {

            $analyticsProvider.registerPageTrack(function (path) {
                var params = {};
                params.siteId = 1;
                params.version = 1;
                params.url = window.location.href;
                params.click = JSON.stringify(yiyingli.clicks);
                params.height = window.screen.availHeight;
                params.width = window.screen.availWidth;
                params.logUid = yiyingli.logUid;
                params.other = JSON.stringify({referrer: document.referrer, sessionId: yiyingli.sessionId});
                yiyingli.log(yiyingli.baseUrl + "/mark?" + jQuery.param(params));
                yiyingli.setClicks([]);
            });
            $analyticsProvider.registerEventTrack(function (action, properties) {
                //console.log(action, properties);
            });

        }]);
})(angular);