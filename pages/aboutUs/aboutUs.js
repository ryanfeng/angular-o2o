(function () {
    var staff = [
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        },
        {
            icon: 'http://image.1yingli.cn/14443751497102ad10826-9645-46fa-a206-05b1f65b7098.jpg',
            name: '胡钟锴',
            position: 'CEO'
        }
    ];
    $(window).scroll(function () {
        if ($(document).scrollTop() >= 300) {
            $("#back-to-top").fadeIn();
        } else {
            $("#back-to-top").fadeOut();
        }
    });

    app.controller('AboutUsController', ['$scope', '$routeParams', 'HttpService', 'AlertService', aboutUs]);
    function aboutUs($scope, $routeParams, HttpService, AlertService) {
        $scope.staff = staff;
        $scope.form1 = false;
        $scope.form2 = false;
        $scope.aboutC = "#56bbe8";
        $scope.jionC = "#f8f8f8";
        $scope.emailC = "#f8f8f8";
        $scope.value = 1;

        $scope.scroll = scroll;
        $scope.backToTop = backToTop;
        $scope.about = about;
        $scope.jion = jion;
        $scope.email = email;
        $scope.formAbout = formAbout;
        $scope.formJion = formJion;
        $scope.formEmail = formEmail;


        if ($routeParams.page && $routeParams.page == '1') {
            $scope.value = 4;
            formJion();
            jion();
            setTimeout(function () {
                $('body').scrollTop($('#hire').offset().top);
            });
        }
        if ($routeParams.page && $routeParams.page == '2') {
            formEmail();
            email();
            $scope.value = 5;
            formJion();
            if ($('#cooperation').length > 0) {
                setTimeout(function () {
                    $('body').scrollTop($('#cooperation').offset().top);
                });
            }
        }
        if (!$routeParams.page) {
            $('body').scrollTop(0);
        }


        //头部颜色
        function about() {
            $scope.aboutC = "#56bbe8";
            $scope.jionC = "#f8f8f8";
            $scope.emailC = "#f8f8f8";
        }

        function jion() {
            $scope.aboutC = "#f8f8f8";
            $scope.jionC = "#56bbe8";
            $scope.emailC = "#f8f8f8";
        }

        function email() {
            $scope.aboutC = "#f8f8f8";
            $scope.jionC = "#f8f8f8";
            $scope.emailC = "#56bbe8";
        }

        //弹框影藏
        function formAbout() {
            console.log('asdasd');
            $scope.form1 = true;
            $scope.form3 = false;
        }

        function formJion() {
            $scope.form1 = false;
            $scope.form3 = false;
        }

        function formEmail() {
            $scope.form1 = false;
            $scope.form3 = true;
        }

        function scroll(id) {
            if ($(id)) {
                $('body').animate({scrollTop: $(id).offset().top}, '2000');
            }
        }

        function backToTop() {
            $('body').animate({scrollTop: 0}, '2000');
        }

        $scope.submitBack = submitBack;
        function submitBack() {
            if (!$scope.contentBack) {
                AlertService.showAlert('您还没有填写反馈意见和建议!', undefined);
                return;
            }
            HttpService.apiGet("function", "suggest", {content: $scope.contentBack}, getCallBack);
            function getCallBack(data) {
                if (data.state == 'success') {
                    AlertService.showAlert('反馈问题成功', undefined);
                    $scope.contentBack = '';
                }
            }
        }
    }
})();