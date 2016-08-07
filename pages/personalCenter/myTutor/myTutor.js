(function () {
    app.controller('MyTutorController', ['$scope', 'PersonalService', 'SessionService', 'OrderListService',
        'HttpService', 'AlertService', '$location', '$routeParams', '$rootScope', myTutorController]);

    function myTutorController($scope, PersonalService, SessionService, OrderListService,
                               HttpService, AlertService, $location, $routeParams, $rootScope) {
        $scope.myTutorService = PersonalService;
        $scope.sessionService = SessionService;
        $scope.payUrl = HttpService.payUrl;

        $scope.currentPage = 1;
        $scope.detail = undefined;
        $scope.comment = "";
        $scope.starNum = 0;
        $scope.payMethod = '1';
        $scope.showState = false;
        $scope.showDetail = false;
        $scope.showComment = false;
        $scope.showPayStyle = false;
        $scope.showPayFlag = false;
        $scope.showPayQRFlag = false;


        $scope.changePage = changePage;
        $scope.orderListService = OrderListService;
        $scope.changeDetail = changeDetail;
        $scope.changeDetailToShowState = changeDetailToShowState;
        $scope.hide = hide;
        $scope.cancelAfterPay = cancelAfterPay;
        $scope.cancelOrder = cancelOrder;
        $scope.cancelOrderAfterEnsure = cancelOrderAfterEnsure;
        $scope.cancelOrderAfterAccept = cancelOrderAfterAccept;
        $scope.satisfyOrder = satisfyOrder;
        $scope.dissatisfyOrder = dissatisfyOrder;
        $scope.commentOrder = commentOrder;
        $scope.makeComment = makeComment;
        $scope.choosePay = choosePay;
        $scope.showPay = showPay;
        $scope.showMask = showMask;
        $scope.hideMask = hideMask;
        $scope.showMobileDetail = showMobileDetail;
        $scope.scrollTo = scrollTo;

        $scope.$on('getMyTutor', onGetMyTutor);

        function onGetMyTutor() {
            $scope.data = PersonalService.myTutor;
            hideMask();
            if ($rootScope.showPay == 1 && $routeParams.page == 1 && $scope.data.data[0].orders[0].state == '0100') {
                $scope.detail = $scope.data.data[0];
                $scope.data.data[0].showPayStyle = true;
                $scope.showPayStyle = true;
            }
        }

        //适配端弹出窗体全部显示黑色背景
        function showMask() {
            if ($scope.data) {
                for (var i = 0; i < $scope.data.data.length; i++) {
                    if ($scope.data.data[i].showPayStyle || $scope.data.data[i].showPayFlag || $scope.data.data[i].showPayQRFlag) {
                        return true;
                    }
                    for (var j = 0; j < $scope.data.data[i].orders.length; j++) {
                        if ($scope.data.data[i].orders[j].showOperation || $scope.data.data[i].orders[j].showComment)
                            return true;
                    }
                }
            }
            return false;
        }

        //适配端弹出窗体全部不显示
        function hideMask() {
            if ($scope.data) {
                for (var i = 0; i < $scope.data.data.length; i++) {
                    $scope.data.data[i].showPayFlag = false;
                    $scope.data.data[i].showPayStyle = false;
                    $scope.data.data[i].showPayQRFlag = false;
                    for (var j = 0; j < $scope.data.data[i].orders.length; j++) {
                        $scope.data.data[i].orders[j].showOperation = false;
                        $scope.data.data[i].orders[j].showComment = false;
                    }
                }
            }
        }

        if (SessionService.isLogin()) {
            PersonalService.getMyTutor($scope.currentPage);
        }

        function changePage(page) {
            hide();
            if ($scope.currentPage == 1 && page == 1) {
                $location.url($location.path());
                return;
            }
            if (page != $scope.currentPage) {
                $('body').scrollTop(0);
            }
            $scope.currentPage = page;
            PersonalService.getMyTutor($scope.currentPage);
        }

        function changeDetail(order) {
            $scope.detail = order;
            $scope.showDetail = true;
        }

        function changeDetailToShowState(order) {
            $scope.detail = order;
            $scope.detail.showOperation = true;
            $scope.showState = true;
        }

        function hide() {
            $scope.showDetail = false;
            $scope.showState = false;
            $scope.showComment = false;
            $scope.showPayStyle = false;
            $scope.showPayFlag = false;
            $scope.showPayQRFlag = false;
            hideMask();
        }


        //四个取消订单
        function cancelOrder(olid) {
            hide();
            AlertService.showAlertWithCancel('确认放弃支付', showAlertCallBack);
            function showAlertCallBack() {
                HttpService.apiGet('order', 'cancelOrder', {olid: olid}, apiGetCallBack);
                function apiGetCallBack(data) {
                    AlertService.showAlert('取消成功', undefined);
                    changePage($scope.currentPage);
                }
            }
        }

        function cancelAfterPay(orderId) {
            hide();
            function apiGetCallBack(data) {
                AlertService.showAlert('取消成功', undefined);
                changePage($scope.currentPage);
            }
            function showAlertCallBack() {
                HttpService.apiGet('order', 'cancelOrderAfterPay', {orderId: orderId}, apiGetCallBack);
            }
            AlertService.showAlertWithCancel('确认取消订单', showAlertCallBack);
        }

        function cancelOrderAfterAccept(orderId) {
            hide();
            function apiGetCallBack(data) {
                AlertService.showAlert('取消成功', undefined);
                changePage($scope.currentPage);
            }
            function showAlertCallBack() {
                HttpService.apiGet('order', 'cancelOrderAfterAccept', {orderId: orderId}, apiGetCallBack);
            }
            AlertService.showAlertWithCancel('确认取消订单', showAlertCallBack);
        }

        function cancelOrderAfterEnsure(orderId) {
            hide();
            function apiGetCallBack(data) {
                AlertService.showAlert('取消成功', undefined);
                changePage($scope.currentPage);
            }
            function showAlertCallBack() {
                HttpService.apiGet('order', 'cancelOrderAfterEnsure', {orderId: orderId}, apiGetCallBack);
            }
            AlertService.showAlertWithCancel('确认取消订单', showAlertCallBack);
        }

        function satisfyOrder(orderId) {
            hide();
            HttpService.apiGet('order', 'satisfyOrder', {orderId: orderId}, apiGetCallBack);
            apiGetCallBack();
            function apiGetCallBack(data) {
                AlertService.showAlert('订单完成', apiGetCallBackComment);
                function apiGetCallBackComment() {
                    $scope.showComment = true;
                    for (var i = 0; i < $scope.data.data.length; i++) {
                        if ($scope.data.data[i].orderId == orderId) {
                            $scope.data.data[i].showComment = true;
                        }
                    }
                }

                changePage($scope.currentPage);
            }
        }

        function dissatisfyOrder(orderId) {
            hide();
            AlertService.showAlertWithCancel('确认不满意', showAlertCallBack);

            function showAlertCallBack() {
                HttpService.apiGet('order', 'dissatisfyOrder', {orderId: orderId}, apiGetCallBack);
                function apiGetCallBack(data) {
                    AlertService.showAlert('投诉成功', undefined);
                    changePage($scope.currentPage);
                }
            }
        }


        function makeComment() {
            hide();
            $scope.showComment = true;
        }


        function commentOrder(orderId, teacherId, comment, starNum) {
            if (comment.trim().length == 0) {
                AlertService.showAlert("不能提交空评论", undefined);
                return;
            }
            if (starNum == 0) {
                AlertService.showAlert("请给老师评分", undefined);
                return;
            }
            hide();
            AlertService.showAlertWithCancel("确认提交评论", showAlertCallBack);

            function showAlertCallBack() {
                var params = {};
                params.teacherId = teacherId;
                params.orderId = orderId;
                params.content = comment;
                params.score = starNum + '';
                HttpService.apiGet('user', 'commentTeacher', params, apiGetCallBack);

                function apiGetCallBack(data) {
                    AlertService.showAlert("提交评论成功");
                }
            }
        }

        function choosePay() {
            hide();
            $scope.showPayStyle = true;
        }

        //支付界面
        function showPay(payMethod, myTutor) {
            hide();
            if (payMethod == 3 || myTutor.payMethod == 3) {
                HttpService.apiGet('function', 'getWXPayUrl', {olid: myTutor.batchNo}, apiGetCallBack)
            } else {
                $scope.showPayFlag = true;
                myTutor ? myTutor.showPayFlag = true : '';
            }
            function apiGetCallBack(data) {
                var text = '请微信扫码支付';
                if (isWeixinBrowser()) {
                    text = '请长按图片,识别图中二维码'
                }
                $scope.showPayQRFlag = true;
                myTutor.showPayQRFlag = true;
                if (document.getElementById("wxPay")) {
                    document.getElementById("wxPay").innerHTML = "";
                    var qrcode = new QRCode(document.getElementById("wxPay"), {
                        width: 160,
                        height: 160,
                        title: text,
                        text: data.url
                    });
                    qrcode.makeCode(data.url + "");
                }
            }
        }

        function showMobileDetail(parIndex, index) {
            PersonalService.showDetail($scope.data.data[parIndex].orders[index]);
            $location.path('orderDetail');
        }

        function scrollTo(e) {
            $('body').animate({
                scrollTop: ($(e.currentTarget).offset().top - $(window).height() / 2)
            }, 800);
        }
    }
})();