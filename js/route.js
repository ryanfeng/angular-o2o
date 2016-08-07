(function () {
    app.config(['$routeProvider', '$locationProvider', '$analyticsProvider', 'MetaTagsProvider',
        '$cookiesProvider', route]);
    function route($routeProvider, $locationProvider, $analyticsProvider, MetaTagsProvider,
                   $cookiesProvider) {
        if (isMobile()) {
            //移动端
            $routeProvider
                .when("/", {
                    templateUrl: "/pages/home/mobile/home.html",
                    controller: "HomeController"
                })
                .when("/theme/:id", {
                    templateUrl: "/pages/theme/mobile/theme.html",
                    controller: "ThemeController"
                })
                .when("/search", {
                    templateUrl: "/pages/search/mobile/search.html",
                    controller: "SearchController"
                })
                .when("/aboutUs", {
                    templateUrl: "/pages/aboutUs/mobile/aboutUs.html",
                    controller: "AboutUsController"
                })
                .when("/feedback", {
                    templateUrl: "/pages/aboutUs/feedback/mobile/feedback.html",
                    controller: "AboutUsController"
                })
                .when("/teacher/:id", {
                    templateUrl: "/pages/teacher/mobile/teacher.html",
                    controller: "TeacherController"
                })
                .when("/lookOrder/:proId", {
                    templateUrl: "/pages/teacher/mobile/userOrder.html",
                    controller: "ShoppingController"
                })
                .when("/passage/:id", {
                    templateUrl: "/pages/passage/mobile/passage.html",
                    controller: "PassageController"
                })
                .when("/help", {
                    templateUrl: "/pages/help/mobile/help.html",
                    controller: "HelpController"
                })
                .when("/protocol", {
                    templateUrl: "/pages/register/protocol/mobile/protocol.html",
                })
                .when("/shopping", {
                    templateUrl: "/pages/shopping/mobile/shopping.html",
                    controller: "ShoppingController"
                })
                .when("/service/:id", {
                    templateUrl: "/pages/service/mobile/service.html",
                    controller: "ServiceController"
                })
                .when("/serverOrder", {
                    templateUrl: "/pages/teacher/mobile/userOrder.html",
                    controller: "ServiceOrderController"
                })
                .when("/serverContract", {
                    templateUrl: "/pages/teacher/mobile/userContract.html",
                    controller: "ServiceOrderController"
                })
                .when("/shoppingOrder/:id", {
                    templateUrl: "/pages/teacher/mobile/userOrder.html",
                    controller: "ServiceController"
                })
                .when("/shoppingContract", {
                    templateUrl: "/pages/teacher/mobile/userContract.html",
                    controller: "ShoppingController"
                })

                //session 相关
                .when("/login", {
                    templateUrl: "/pages/login/mobile/login.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "/pages/register/mobile/register.html",
                    controller: "RegisterController"
                })
                .when("/forget", {
                    templateUrl: "/pages/forget/mobile/forget.html",
                    controller: "ForgetController"
                })

                //个人中心
                .when("/messageCenter", {
                    templateUrl: "/pages/personalCenter/messageCenter/mobile/messageCenter.html",
                    controller: "MessageCenterController"
                })
                .when("/myTutor", {
                    templateUrl: "/pages/personalCenter/myTutor/mobile/myTutor.html",
                    controller: "MyTutorController"
                })
                .when("/orderDetail", {
                    templateUrl: "/pages/personalCenter/myTutor/mobile/orderDetail.html",
                    controller: "OrderDetailController"
                })
                .when("/likeList", {
                    templateUrl: "/pages/personalCenter/likeList/mobile/likeList.html",
                    controller: "LikeListController"
                })
                .when("/comment", {
                    templateUrl: "/pages/personalCenter/comment/mobile/comment.html",
                    controller: "CommentController"
                })
                .when("/modifyInformation", {
                    templateUrl: "/pages/personalCenter/modifyInformation/mobile/modifyInformation.html",
                    controller: "ModifyInformationController"
                })
                .when("/account", {
                    templateUrl: "/pages/personalCenter/account/mobile/account.html",
                    controller: "AccountController"
                })

                //成为导师
                .when("/bct1", {
                    templateUrl: "/pages/bct1/mobile/bct1.html",
                    controller: "Bct1Controller"
                })
                .when("/bct2", {
                    templateUrl: "/pages/bct2/mobile/bct2.html",
                    controller: "Bct2Controller"
                })

                // 导师中心
                .when("/myStudent", {
                    templateUrl: "/pages/teacherCenter/myStudent/mobile/myStudent.html",
                    controller: "MyStudentController"
                })
                .when("/tutorPage", {
                    templateUrl: "/pages/teacherCenter/tutorPage/mobile/tutorPage.html",
                    controller: "TutorPageController"
                })
                .when("/tutorComment", {
                    templateUrl: "/pages/teacherCenter/tutorComment/mobile/tutorComment.html",
                    controller: "TutorCommentController"
                })
                .when("/myMoney", {
                    templateUrl: "/pages/teacherCenter/myMoney/mobile/myMoney.html",
                    controller: "MyMoneyController"
                })
                .when("/passageList/:state", {
                    templateUrl: "/pages/teacherCenter/passageList/mobile/passageList.html",
                    controller: "TeacherPassageList"
                })
                .when("/preview", {
                    templateUrl: "/pages/teacherCenter/preview/mobile/preview.html",
                    controller: "PassagePreviewController"
                })
                .when("/myServer", {
                    templateUrl: "/pages/teacherCenter/myServer/mobile/myServer.html",
                    controller: "MyServerController"
                })
                .when("/addServer/:id", {
                    templateUrl: "/pages/teacherCenter/addServer/mobile/addServer.html",
                    controller: "ReviseController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        } else {
            //PC端
            $routeProvider
                .when("/", {
                    templateUrl: "/pages/home/home.html",
                    controller: "HomeController"
                })
                .when("/teacher/:id", {
                    templateUrl: "/pages/teacher/teacher.html",
                    controller: "TeacherController"
                })
                .when("/passage/:id", {
                    templateUrl: "/pages/passage/passage.html",
                    controller: "PassageController"
                })
                .when("/theme/:id", {
                    templateUrl: "/pages/theme/theme.html",
                    controller: "ThemeController"
                })
                .when("/aboutUs", {
                    templateUrl: "/pages/aboutUs/aboutUs.html",
                    controller: "AboutUsController"
                })
                .when("/feedback", {
                    templateUrl: "/pages/aboutUs/feedback/feedback.html",
                    controller: "AboutUsController"
                })
                .when("/search", {
                    templateUrl: "/pages/search/search.html",
                    controller: "SearchController"
                })
                .when("/help", {
                    templateUrl: "/pages/help/help.html",
                    controller: "HelpController"
                })
                .when("/protocol", {
                    templateUrl: "/pages/register/protocol/protocol.html",
                })
                .when("/shopping", {
                    templateUrl: "/pages/shopping/shopping.html",
                    controller: "ShoppingController",
                })
                .when("/service/:id", {
                    templateUrl: "/pages/service/service.html",
                    controller: "ServiceController"
                })

                //session 相关
                .when("/login", {
                    templateUrl: "/pages/login/login.html",
                    controller: "LoginController"
                })
                .when("/register", {
                    templateUrl: "/pages/register/register.html",
                    controller: "RegisterController"
                })
                .when("/forget", {
                    templateUrl: "/pages/forget/forget.html",
                    controller: "ForgetController"
                })

                //成为导师
                .when("/bct1", {
                    templateUrl: "/pages/bct1/bct1.html",
                    controller: "Bct1Controller"
                })
                .when("/bct2", {
                    templateUrl: "/pages/bct2/bct2.html",
                    controller: "Bct2Controller"
                })


                //个人中心
                .when("/messageCenter", {
                    templateUrl: "/pages/personalCenter/messageCenter/messageCenter.html",
                    controller: "MessageCenterController"
                })
                .when("/myTutor", {
                    templateUrl: "/pages/personalCenter/myTutor/myTutor.html",
                    controller: "MyTutorController"
                })
                .when("/likeList", {
                    templateUrl: "/pages/personalCenter/likeList/likeList.html",
                    controller: "LikeListController"
                })
                .when("/comment", {
                    templateUrl: "/pages/personalCenter/comment/comment.html",
                    controller: "CommentController"
                })
                .when("/modifyInformation", {
                    templateUrl: "/pages/personalCenter/modifyInformation/modifyInformation.html",
                    controller: "ModifyInformationController"
                })
                .when("/account", {
                    templateUrl: "/pages/personalCenter/account/account.html",
                    controller: "AccountController"
                })


                //导师中心
                .when("/myStudent", {
                    templateUrl: "/pages/teacherCenter/myStudent/myStudent.html",
                    controller: "MyStudentController"
                })
                .when("/passageList/:state", {
                    templateUrl: "/pages/teacherCenter/passageList/passageList.html",
                    controller: "TeacherPassageList"
                })
                .when("/editPassage", {
                    templateUrl: "/pages/teacherCenter/editPassage/editPassage.html",
                    controller: "EditPassageController"
                })
                .when("/preview", {
                    templateUrl: "/pages/teacherCenter/preview/preview.html",
                    controller: "PassagePreviewController"
                })
                .when("/tutorPage", {
                    templateUrl: "/pages/teacherCenter/tutorPage/tutorPage.html",
                    controller: "TutorPageController"
                })
                .when("/tutorComment", {
                    templateUrl: "/pages/teacherCenter/tutorComment/tutorComment.html",
                    controller: "TutorCommentController"
                })
                .when("/myMoney", {
                    templateUrl: "/pages/teacherCenter/myMoney/myMoney.html",
                    controller: "MyMoneyController"
                })
                .when("/teacherPreview", {
                    templateUrl: "/pages/teacherCenter/teacherPreview/teacherPreview.html",
                    controller: "TeacherPreviewController"
                })
                .when("/myServer", {
                    templateUrl: "/pages/teacherCenter/myServer/myServer.html",
                    controller: "MyServerController"
                })
                .when("/addServer", {
                    templateUrl: "/pages/teacherCenter/addServer/addServer.html",
                    controller: "AddServerController"
                })
                .when("/addServer/:id", {
                    templateUrl: "/pages/teacherCenter/addServer/addServer.html",
                    controller: "ReviseController"
                })
                .when("/previewServer/:id", {
                    templateUrl: "/pages/teacherCenter/previewServer/previewServer.html",
                    controller: "SeeServerController"
                })
                .when("/previewServer", {
                    templateUrl: "/pages/teacherCenter/previewServer/previewServer.html",
                    controller: "PreviewServerController"
                })


                .otherwise({
                    redirectTo: "/"
                })
        }
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        //.hashPrefix('!');
        $analyticsProvider.firstPageview(true);
        $analyticsProvider.withAutoBase(false);

        var defaultValue = {
            title: '一英里 - 一对一经验交易平台',
            description: '「一英里」专注于一对一咨询，致力于打造最便捷畅通的大学生线上交流平台，打破信息不对称的壁垒，轻松连接高校名企精英与万千追梦学子。',
            robots: 'index, follow',
            keywords: '咨询,求职,经验,解决问题,世界名校,一对一'
        };
        MetaTagsProvider
            .otherwise(defaultValue);
        $cookiesProvider.defaults.path = '/';
    }

    app.run(['MetaTags', "HttpService", function (MetaTags, HttpService) {
        HttpService.getWXToken(function () {

        });
        FastClick.attach(document.body);
        MetaTags.initialize();
    }]);
})();
