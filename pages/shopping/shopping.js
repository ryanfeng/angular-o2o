(function () {
    var flag = true;

    function checkBottom() {
        if ($('.mobile-shopping').length == 0) {
            return;
        }
        var scrollTop = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        if ((height - scrollTop) < 180) {
            $('.u-bottom').addClass('u-bottom-active');
            if (flag) {
                flag = false;
                $('.u-bottom').fadeOut(0);
                $('.u-bottom').fadeIn(500);
            }
        } else {
            $('.u-bottom').removeClass('u-bottom-active');
            if(!flag){
                $('.u-bottom').fadeIn(500);
                flag = true;
            }
        }
    }

    app.controller("ShoppingController", ['$scope', '$localStorage', 'ServiceService', 'SessionService', 'AlertService',
        '$location', 'BecomeTeacherService', 'ValidateService', 'TeacherService', '$rootScope', '$routeParams', shoppingController]);
    function shoppingController($scope, $localStorage, ServiceService, SessionService, AlertService, $location,
                                BecomeTeacherService, ValidateService, TeacherService, $rootScope, $routeParams) {
        //选择国家下拉框
        $scope.isShowCountry = false;
        $scope.countrys = BecomeTeacherService.countrys;
        $scope.country = BecomeTeacherService.countrys[0];
        $scope.selectCountry = selectCountry;

        //适配
        $(window).scroll(checkBottom);

        $scope.shopping = $localStorage.shopping;

        //刪除服務PC
        $scope.deleteService = deleteService;
        //查看订单详情PC
        $scope.showOrderDetail = showOrderDetail;
        //选择全部服务PC
        $scope.selectAll = selectAll;
        //选择当前服务PC
        $scope.saveService = saveService;
        //计算当前总价PC
        $scope.allTotal = allTotal;
        //立即结算PC And Mobile,显示用户信息表单
        $scope.balanceAll = balanceAll;
        //修改当前问题信息PC
        $scope.changeDetail = changeDetail;
        //取消窗体Mobile
        $scope.closeOrder = closeOrder;
        //支付提交MobiLe
        $scope.submitAll = submitAll;
        //支付提交PC
        $scope.doOrder = doOrder;
        //查看订单详情
        $scope.lookOrder = lookOrder;

        $scope.chooseServiceNum = 0;
        $scope.allMoney = 0;
        $scope.formatInteger = formatInteger;
        $scope.userVa = {};
        $scope.user = {};

        $scope.isLogin = isLogin;

        var shopping = $scope.shopping;
        for (var i in shopping) {
            shopping[i].isCheck = false;
            for (var j in shopping[i].services) {
                getServiceInfo(shopping[i].services[j]);
                function getServiceInfo(service) {
                    service.isCheck = false;
                    ServiceService.getServiceById(service.serviceProId, getServiceByIdCallBack);
                    function getServiceByIdCallBack(data) {
                        service.data = data;
                        checkBottom();
                    }
                }
            }
        }
        checkBottom();

        //查看服务详情
        if ($routeParams.proId) {
            for (var i in shopping) {
                for (var j in shopping[i].services) {
                    if (shopping[i].services[j].serviceProId == $routeParams.proId) {
                        $scope.isNotShowOrderDetail = true;
                        $scope.service = shopping[i].services[j];
                        $scope.teacher = shopping[i];
                        $scope.isService = true;
                        $scope.teacher.serviceOnsale = shopping[i].services[j].data.onsale;
                        $scope.teacher.servicePrice = shopping[i].services[j].data.price;
                        $scope.teacher.servicePriceTemp = shopping[i].services[j].data.priceTemp;
                        $scope.teacher.serviceNumeral = shopping[i].services[j].data.numeral;
                        $scope.teacher.serviceQuantifier = shopping[i].services[j].data.quantifier;
                        $scope.teacher.serverTopic = shopping[i].services[j].data.title;
                        $scope.teacher.serviceCount = shopping[i].services[j].count;
                        break;
                    }
                }
            }
        }

        function selectCountry(index) {
            $scope.country = BecomeTeacherService.countrys[index];
            $scope.isShowCountry = false;
        }

        function deleteService(proId) {
            AlertService.showAlertWithCancel("确定移除此服务吗?", function () {
                for (var i in shopping) {
                    for (var j in shopping[i].services) {
                        if (shopping[i].services[j].serviceProId == proId) {
                            shopping[i].services.splice(j, 1);
                            for (i in shopping) {
                                if (shopping[i].services.length == 0) {
                                    shopping.splice(i, 1);
                                    $rootScope.$broadcast('loadShoppCount');
                                }
                            }
                            $scope.allTotal();
                            return;
                        }
                    }
                }
            });
        }

        function saveService(proId, teacherId) {
            for (i in shopping) {
                if (shopping[i].teacherId == teacherId) {
                    for (j in shopping[i].services) {
                        if (shopping[i].services[j].serviceProId == proId) {
                            shopping[i].services[j].isCheck = !shopping[i].services[j].isCheck;
                            break;
                        }
                    }
                } else {
                    shopping[i].isCheck = false;
                    for (j in shopping[i].services) {
                        shopping[i].services[j].isCheck = false;
                    }
                }
            }
            $scope.allTotal();
        }

        function allTotal() {
            $scope.chooseServiceNum = 0;
            $scope.allMoney = 0;
            for (i in shopping) {
                for (j in shopping[i].services) {
                    if (shopping[i].services[j].isCheck) {
                        $scope.chooseServiceNum = $scope.chooseServiceNum + parseInt(shopping[i].services[j].count);
                        $scope.allMoney = $scope.allMoney + (shopping[i].services[j].count * shopping[i].services[j].data.price);
                    }
                }
            }
        }

        function selectAll(teacherId) {
            for (i in shopping) {
                if (shopping[i].teacherId == teacherId) {
                    if (shopping[i].isCheck) {
                        shopping[i].isCheck = false;
                        for (j in shopping[i].services) {
                            shopping[i].services[j].isCheck = false;
                        }
                    } else {
                        shopping[i].isCheck = true;
                        for (j in shopping[i].services) {
                            shopping[i].services[j].isCheck = true;
                        }
                    }
                } else {
                    shopping[i].isCheck = false;
                    for (j in shopping[i].services) {
                        shopping[i].services[j].isCheck = false;
                    }
                }
            }
            $scope.allTotal();
        }


        var user = $scope.user;
        var userVa = $scope.userVa;
        userVa.nameVa = true;
        userVa.phoneVa = true;
        userVa.emailVa = true;
        userVa.contactVa = true;
        function balanceAll() {
            user.serviceList = [];
            if (isLogin()) {
                for (var i in shopping) {
                    for (var j in shopping[i].services) {
                        if (shopping[i].services[j].isCheck) {
                            var service = {
                                question: shopping[i].services[j].question,
                                count: shopping[i].services[j].count,
                                resume: shopping[i].services[j].resume,
                                selectTime: shopping[i].services[j].selectTime,
                                serviceKind: shopping[i].services[j].serviceKind,
                                serviceProId: shopping[i].services[j].serviceProId
                            }
                            user.teacherId = shopping[i].teacherId;
                            user.serviceList.push(service);
                        }
                    }
                }
                if (user.serviceList.length == 0) {
                    AlertService.showAlert("您还没有选择服务!", undefined);
                } else {
                    if (isMobile()) {
                        $localStorage.orderInfo = user;
                        $location.path("/shoppingContract");
                    } else {
                        $scope.isInfoShow = true;
                    }
                }
            }
        }

        //pc提交
        function doOrder() {
            var user = $scope.user;
            !user.name?userVa.nameVa = false:'';
            userVa.phoneVa = ValidateService.phoneVa(user.phoneNew);
            userVa.emailVa = ValidateService.emailVa(user.email);
            !user.contact?userVa.contactVa = false:'';

            if (userVa.nameVa && userVa.phoneVa && userVa.emailVa && userVa.contactVa) {
                user.phone = $("#phoneCode").text().replace(/\+/, '') + "-" + user.phoneNew;
                !user.voucher ? delete user.voucher : '';

                TeacherService.doOrder(user, callback);
                function callback() {
                    //删除购物车购买信息
                    for (var l in user.serviceList) {
                        if (user.serviceList[l].serviceProId) {
                            for (var i in shopping) {
                                for (var j in shopping[i].services) {
                                    if (shopping[i].services[j].serviceProId == user.serviceList[l].serviceProId) {
                                        shopping[i].services.splice(j, 1);
                                        for (i in shopping) {
                                            if (shopping[i].services.length == 0) {
                                                shopping.splice(i, 1);
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    $scope.isInfoShow = false;
                    AlertService.showAlert("订单提交成功，点击立即付款。", callbackAcount);
                    function callbackAcount() {
                        $rootScope.showPay = 1;
                        $location.path("/myTutor").search('page', 1);
                    }
                }
            }
        }

        function showOrderDetail(proId) {
            $scope.questionVa = true;
            $scope.introduceVa = true;
            $scope.selectTimeVa = true;
            $scope.isOrderShow = true;
            $scope.indexI = 0;
            $scope.indexJ = 0;
            for (var i in shopping) {
                for (var j in shopping[i].services) {
                    if (shopping[i].services[j].serviceProId == proId) {
                        $scope.teacher = shopping[i];
                        $scope.serviceNow = $.extend(true, {}, shopping[i].services[j]);
                        $scope.indexI = i;
                        $scope.indexJ = j;
                        return;
                    }
                }
            }
        }

        function submitAll() {
            var user = $scope.user;
            if (!user.name || !ValidateService.emailVa(user.email) || !user.contact || !ValidateService.phoneVa(user.newPhone)) {
                AlertService.showAlert("姓名,微信必须填写，且手机和邮箱格式必须正确。", undefined);
            } else {
                $localStorage.orderInfo.name = user.name;
                $localStorage.orderInfo.contact = user.contact;
                $localStorage.orderInfo.email = user.email;
                $localStorage.orderInfo.phone = $("#phoneCode").text().replace(/\+/, '') + "-" + user.newPhone;
                user.voucher ? $localStorage.orderInfo.voucher = user.voucher : '';
                console.log();

                TeacherService.doOrder($localStorage.orderInfo, callback);
                function callback() {
                    AlertService.showAlert("订单提交成功，点击立即付款。", callbackAcount);
                    function callbackAcount(data) {
                        //删除购物车购买信息
                        for (var l in $localStorage.orderInfo.serviceList) {
                            if ($localStorage.orderInfo.serviceList[l].serviceProId) {
                                for (var i in shopping) {
                                    for (var j in shopping[i].services) {
                                        if (shopping[i].services[j].serviceProId == $localStorage.orderInfo.serviceList[l].serviceProId) {
                                            shopping[i].services.splice(j, 1);
                                            for (i in shopping) {
                                                if (shopping[i].services.length == 0) {
                                                    shopping.splice(i, 1);
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        delete $localStorage.orderInfo;
                        $rootScope.showPay = 1;
                        $location.path("/myTutor").search('page', 1);
                    }
                }
            }
        }

        function changeDetail() {
            var serviceNow = $scope.serviceNow;
            if (!serviceNow.question) {
                $scope.questionVa = false;
            }
            if (!serviceNow.resume) {
                $scope.introduceVa = false;
            }
            if (!serviceNow.selectTime) {
                $scope.selectTimeVa = false;
            }
            if (serviceNow.question && serviceNow.resume && serviceNow.selectTime) {
                shopping[$scope.indexI].services[$scope.indexJ] = serviceNow;
            }
            $scope.isOrderShow = false;
        }

        function isLogin() {
            //判断是否登录
            if (!SessionService.isLogin()) {
                function loginCallback() {
                    $location.path('/login');
                }

                AlertService.showAlertWithCancel("请先登录！", loginCallback);
                return false;
            }
            return true;
        }

        function formatInteger(service, count) {
            var reg = /^[1-9]+[0-9]*]*$/;
            if (isNaN(service.count) || !reg.test(service.count)) {
                service.count = 1;
            } else {
                if (service.count > count) {
                    service.count = count;
                }
            }
            service.count = Number(service.count);
        }

        function closeOrder() {
            $rootScope.back();
        }

        function lookOrder(id) {
            $location.path('/lookOrder/' + id);
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
                $scope.user.phoneNew = oldOrderInfo.phone.split("-")[1];
             }
             $scope.user.email = oldOrderInfo.email;
             $scope.user.contact = oldOrderInfo.contact;
        }

        TeacherService.getOldOrderInfo(oldOrderCallBack);
    }
})();

