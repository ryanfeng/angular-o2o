(function () {
    app.controller('ReviseController', ['$scope', 'ServiceService', 'HttpService', 'PersonalService', 'TeacherCenterService', '$location',
        'AlertService', 'Upload', '$routeParams', reviseController]);
    function reviseController($scope, ServiceService, HttpService, PersonalService, TeacherCenterService,
                              $location, AlertService, Upload, $routeParams) {
        $scope.service = ServiceService;
        $scope.server = {};
        $scope.server.kind = '1';
        $scope.server.talkWay = '0';
        $scope.server.quantifier = '次';
        $scope.server.imageUrls = [];
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
        $scope.isEdit = true;
        $scope.showEdit = false;

        $scope.del = del;
        $scope.modifyPersonPortrait = modifyPersonPortrait;
        $scope.save = save;
        $scope.goBack = goBack;
        $scope.toPreview = toPreview;

        $scope.$on('getPreviewServer', onGetPreviewServer);

        function onGetPreviewServer(event, data) {
            $scope.server = data;
            $scope.server.imageUrls = $scope.server.imageUrls.split(',');
            $scope.server.tips = $scope.server.tip.split(',');
            $scope.server.tip = [];
            for (var i = 0; i < $scope.service.kindTips[$scope.server.kind].data.length; i++) {
                $scope.server.tip.push(false);
            }
            for (var i = 0; i < $scope.server.tips.length; i++) {
                $scope.server.tip[$scope.server.tips[i]] = true;
            }
            $scope.server.count = parseInt($scope.server.count);
            $scope.server.onsale = $scope.server.onsale == 'true';
            $scope.server.onshow = $scope.server.onshow == 'true';
        }

        if (TeacherCenterService.serverInfo.title == undefined) {
            serviceProId();
        } else {
            $scope.server = TeacherCenterService.serverInfo;
            console.log($scope.server);
        }
        function serviceProId() {
            $scope.id = $routeParams.id;
            PersonalService.getPreviewServer($scope.id);
        }


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
                if ($scope.showEdit) {
                    var data = {};
                    data.servicePro = $.extend(true, {}, $scope.server);
                    var tips = [];
                    for (index in $scope.server.tip) {
                        if ($scope.server.tip[index] == true) {
                            tips.push(index);
                        }
                    }
                    tip = tips.join(",");
                    data.servicePro.tip = tip;
                    data.servicePro.quantifier += '';
                    data.servicePro.imageUrls = $scope.server.imageUrls.join(',');
                    var id = $routeParams.id;
                    console.log(data.servicePro.imageUrls);

                    HttpService.apiGet('teacher', 'editServicePro', {
                        serviceProId: id,
                        servicePro: data.servicePro
                    }, apiGetCallBack);
                } else {
                    var params = {
                        serviceProId: $scope.server.serviceProId,
                        price: $scope.server.price,
                        quantifier: $scope.server.quantifier + '',
                        numeral: $scope.server.numeral,
                        count: $scope.server.count + '',
                        onsale: $scope.server.onsale ? 'true' : 'false',
                        pricetemp: $scope.server.priceTemp?$scope.server.priceTemp:0,
                        onshow: $scope.server.onshow ? 'true' : 'false',
                        freetime: $scope.server.freeTime
                    };
                    HttpService.apiGet('teacher', 'editSimpleServicePro', params, apiGetCallBack)
                }
            }
            function apiGetCallBack(data) {
                AlertService.showAlert("修改成功", reset);
            }

            function reset() {
                $location.path('myServer');
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
            history.go(-1);
        }

    }
})();