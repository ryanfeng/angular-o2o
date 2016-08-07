(function () {

    app.service('CreateOrderService', ['HttpService', 'ValidateService', 'TeacherService', 'AlertService',
        '$localStorage', '$location', '$rootScope', createOrderService]);

    function createOrderService(HttpService, ValidateService, TeacherService, AlertService, $localStorage,
                                $location, $rootScope) {
        var service = this;
        service.orderIsNext = false;
        service.isOrderShow = false;
        service.isInfoShow = false;
        service.user = {};
        service.validate = {};
        service.service = {};
        service.service.count = 1;
        service.service.serviceKind = "talk";

        //加入购物车或者下一步
        service.showInfoOrder = showInfoOrder;
        //直接生成订单
        service.doOrder = doOrder;
        service.closeInfoOrder = closeInfoOrder;
        service.closeIntroOrder = closeIntroOrder;
        service.closeAll = closeAll;
        service.refreshData = refreshData;

        function refreshData() {
            service.orderIsNext = false;
            service.isOrderShow = false;
            service.isInfoShow = false;
            service.user = {};
            service.validate = {};
            service.service = {};
            service.service.count = 1;
            service.service.serviceKind = "talk";
        }

        //直接预约服务或闲聊
        function doOrder() {
            !service.user.name?service.validate.nameVa = true:'';
            service.validate.phoneVa = !ValidateService.phoneVa(service.user.phoneNew);
            service.validate.emailVa = !ValidateService.emailVa(service.user.email);
            !service.user.contact?service.validate.contactVa = true:'';

            if (!service.validate.nameVa && !service.validate.phoneVa && !service.validate.emailVa && !service.validate.contactVa) {
                service.isOrderShow = false;
                service.isInfoShow = false;

                service.user.phone = $("#phoneCode").text().replace(/\+/, '') + "-" + service.user.phoneNew;
                service.service.serviceProId ? service.service.serviceKind = "servicePro" : '';
                service.user.serviceList = [service.service];
                !service.user.voucher?delete service.user.voucher:'';

                TeacherService.doOrder(service.user, callback);
                function callback() {
                    AlertService.showAlertWithCancel("预约成功，立即付款!", succcessCallBack);
                    function succcessCallBack() {
                        $rootScope.showPay = 1;
                        $location.path("/myTutor").search('page', 1);
                    }
                    service.service.serviceProId?$rootScope.$broadcast('loadServiceData'):'';
                }
            }
        }

        //加入购物车或者下一步
        function showInfoOrder(isShow) {
            !service.service.question ? service.validate.questionVa = true : '';
            !service.service.resume ? service.validate.introduceVa = true : '';
            !service.service.selectTime ? service.validate.selectTimeVa = true : '';

            if (service.service.question && service.service.resume && service.service.selectTime) {
                if (service.orderIsNext) {
                    service.isOrderShow = false;
                    service.isInfoShow = true;
                } else {
                    service.isOrderShow = false;

                    //没有购物车或者购物车没有数据
                    if ($localStorage.shopping == undefined || $localStorage.shopping.length == 0) {
                        var oneShopping = {};
                        newTeacher(oneShopping);
                        oneShopping.services = [];
                        newService(oneShopping.services);
                        $localStorage.shopping = [];
                        $localStorage.shopping.push(oneShopping);
                        successHandle();
                    } else {
                        //新的导师服务
                        var shopping = $localStorage.shopping;
                        if (isNewShoping()) {
                            var oneShopping = {};
                            newTeacher(oneShopping);
                            oneShopping.services = [];
                            newService(oneShopping.services);
                            shopping.push(oneShopping);
                            successHandle();
                        }
                        //添加导师服务
                        function isNewShoping() {
                            for (var i in shopping) {
                                if (shopping[i].teacherId == service.user.teacherId) {
                                    newService(shopping[i].services);
                                    successHandle();
                                    return false;
                                }
                            }
                            return true;
                        }
                    }

                    function successHandle(){
                        AlertService.showAlert("添加成功!", callbackSuccess);
                        function callbackSuccess(){
                            $rootScope.$broadcast('loadShoppCount');
                            refreshData();
                        }
                    }

                    //添加新的服务
                    function newService(array) {
                        var oneService = {};
                        oneService.serviceProId = service.service.serviceProId;
                        oneService.question = service.service.question;
                        oneService.resume = service.service.resume;
                        oneService.selectTime = service.service.selectTime;
                        oneService.count = service.service.count;
                        oneService.serviceKind = "servicePro";
                        array.push(oneService);
                    }
                    //新的导师信息
                    function newTeacher(obj) {
                        obj.teacherId = service.user.teacherId;
                        obj.name = service.user.tname;
                        obj.simpleinfo = service.user.tsimpleinfo;
                        obj.iconUrl = service.user.iconUrl;
                    }
                }
            }
        }

        function closeIntroOrder() {
            service.isOrderShow = false;
        }

        function closeInfoOrder() {
            service.isOrderShow = true;
            service.isInfoShow = false;
        }

        function closeAll() {
            service.isOrderShow = false;
            service.isInfoShow = false;
        }
    }
})();