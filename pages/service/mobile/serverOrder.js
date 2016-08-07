(function () {
    app.controller("ServiceOrderController", ['$scope', '$routeParams', '$rootScope', 'TeacherService', 'AlertService',
        '$location', 'SessionService', 'BecomeTeacherService', 'ValidateService', 'CreateOrderService',
        'ServiceService', '$cookies', serviceOrderController]);
    function serviceOrderController($scope, $routeParams, $rootScope, TeacherService, AlertService, $location,
                                    SessionService, BecomeTeacherService, ValidateService, CreateOrderService,
                                    ServiceService, $cookies) {
        $(window).scrollTop(0);

        $scope.isShowCountry = false;
        $scope.selectCountry = selectCountry;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        $scope.teacher = $cookies.getObject('teacher');
        $scope.user = $cookies.getObject("order");
        $scope.user?"":$scope.user={};
        var teacher = $scope.teacher;
        !teacher?$rootScope.back():$scope.isService  = teacher.isService;
        var user = $scope.user;

        $scope.closeOrder = closeOrder;
        $scope.submitAll = submitAll;
        $scope.subMobileOrder = subMobileOrder;

        $cookies.getObject("order")?$scope.service = $cookies.getObject("order").serviceList[0]:$scope.service = {};
        var service = $scope.service;

        //个人联系方式信息填写
        function submitAll(){
            if(!user.name || !ValidateService.emailVa(user.email) || !user.contact || !ValidateService.phoneVa(user.newPhone)){
                AlertService.showAlert("姓名,微信必须填写，且手机和邮箱格式必须正确。", undefined);
                return;
            }

            var order = $cookies.getObject("order");
            order.teacherId = teacher.teacherId;
            order.phone = $("#phoneCode").text().replace(/\+/, '') + "-" + user.newPhone;
            order.name = user.name;
            order.newPhone = user.newPhone;
            order.email = user.email;
            order.contact = user.contact;
            user.voucher?order.voucher = teacher.voucher:'';

            TeacherService.doOrder(order, callback);
            function callback() {
                $cookies.remove('order');
                $cookies.remove('teacher');
                AlertService.showAlert("预约成功,立即付款。", undefined);
                $rootScope.showPay =1;
                $location.path("myTutor").search('page',1);
            }
        }

        //服务问题等基本信息填写
        function subMobileOrder(){
            if(!service.question || !service.resume || !service.selectTime){
                 AlertService.showAlert("所有信息必须填写!", undefined);
                 return;
            }
            service.count = teacher.serviceCount;
            if(teacher.serviceProId){
                service.serviceKind = "servicePro";
                service.serviceProId = teacher.serviceProId;
            } else {
                service.serviceKind = "talk";
            }
            var orderinfo = {};
            orderinfo.serviceList = [service];

            $cookies.remove('order');
            $cookies.putObject('order', orderinfo, {'path':'/'});
            $location.path("/serverContract");
        }

         function oldOrderCallBack(oldOrderInfo){
             $scope.user.name = oldOrderInfo.name;
             if(oldOrderInfo.phone){
                for(var index in BecomeTeacherService.countrys){
                    if(BecomeTeacherService.countrys[index].code.replace("+","") == oldOrderInfo.phone.split("-")[0]){
                         $scope.country = BecomeTeacherService.countrys[index];
                    }
                }
                $scope.user.newPhone = oldOrderInfo.phone.split("-")[1];
             }
             $scope.user.email = oldOrderInfo.email;
             $scope.user.contact = oldOrderInfo.contact;
        }

        TeacherService.getOldOrderInfo(oldOrderCallBack);

        function closeOrder() {
            $rootScope.back();
        }
    }
})();