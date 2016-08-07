(function () {
    app.controller('AddServerController', ['$scope', 'ServiceService', 'HttpService', 'PersonalService', 'TeacherCenterService', '$location',
        'AlertService', 'Upload', addServerController]);
    function addServerController($scope, ServiceService, HttpService, PersonalService, TeacherCenterService,
                                 $location, AlertService, Upload) {
        $scope.service = ServiceService;
        $scope.server = TeacherCenterService.serverInfo;
        $scope.server.kind = '1';
        $scope.server.talkWay = '0';
        $scope.server.quantifier = '次';
        $scope.tip = false;
        $scope.freeTime = false;
        $scope.count = false;
        $scope.numeral = false;
        $scope.imageUrls = false;
        $scope.title = false;
        $scope.summary = false;
        $scope.content = false;
        $scope.address = false;
        $scope.saveMess = true;
        if ($scope.server.imageUrls == undefined) {
            $scope.server.imageUrls = [];
        }
        $scope.del = del;

        $scope.modifyPersonPortrait = modifyPersonPortrait;
        $scope.save = save;
        $scope.toPreview = toPreview;
        $scope.goBack = goBack;

        function save() {
            if ($scope.server.tip == undefined) {
                $scope.tip = true;
                $scope.saveMess = false;
            }
            if ($scope.server.freeTime == undefined) {
                $scope.freeTime = true;
                $scope.saveMess = false;
            }
            if ($scope.server.count == undefined) {
                $scope.count = true;
                $scope.saveMess = false;
            }
            if ($scope.server.numeral == undefined || $scope.server.price == undefined) {
                $scope.numeral = true;
                $scope.saveMess = false;
            }
            if ($scope.server.imageUrls.length == 0) {
                $scope.imageUrls = true;
                $scope.saveMess = false;
            }
            if ($scope.server.title == undefined) {
                $scope.title = true;
                $scope.saveMess = false;
            }
            if ($scope.server.summary == undefined) {
                $scope.summary = true;
                $scope.saveMess = false;
            }
            if ($scope.server.talkWay == '0') {
                $scope.server.address = '';
            } else if ($scope.server.address == undefined) {
                $scope.address = true;
                $scope.saveMess = false;
            }
            if ($scope.server.content == undefined) {
                $scope.content = true;
                $scope.saveMess = false;
            }
            if ($scope.saveMess) {
                var data = {};
                data.servicePro = $.extend(true, {}, $scope.server);
                var tips = [];
                for (index in $scope.server.tip) {
                    if ($scope.server.tip[index + 1] == true) {
                        tips.push(index + 1);
                    }
                }
                tip = tips.join(",")
                data.servicePro.tip = tip;
                data.servicePro.quantifier += '';
                data.servicePro.imageUrls = $scope.server.imageUrls.toString();

                HttpService.apiGet('teacher', 'createServicePro', data, apiGetCallBack);
                function apiGetCallBack(data) {
                    AlertService.showAlert("添加成功", reset);
                }

                function reset() {
                    TeacherCenterService.serverInfo = {};
                    $location.path('myServer');
                }
            }
        }

        function toPreview() {
            TeacherCenterService.serverInfo = $scope.server;
            $location.path('previewServer');
        }


        function modifyPersonPortrait(file, errFiles) {
            if (file) {
                file.upload = Upload.upload({
                    url: HttpService.uploadPassageImageUrl,
                    data: {file: file}
                });
                HttpService.openLayer();
                file.upload.then(function (response) {
                    HttpService.closeLayer();
                    $scope.server.imageUrls.push(response.data.url + '@!servicestyle');
                });
            }
        }

        function del(url) {
            $scope.server.imageUrls.splice(url, 1);
        }

        function goBack() {
            $location.path('myServer');
        }
    }
})();