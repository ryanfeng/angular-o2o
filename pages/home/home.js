(function () {
    //头部滚动效果
    $(window).scroll(function () {
            if ($(document).scrollTop() >= 1) {
                $(".pc-home .g-hd-top").removeClass('active');
            } else {
                $(".pc-home .g-hd-top").addClass('active');
            }
            var movie = $('.g-movie');
            var scrollTop = $('body').scrollTop();
            if (movie.length > 0) {
                if (scrollTop > movie.offset().top - ($(window).height() / 2)) {
                    movie.addClass('u-movie-active');
                }
                if (scrollTop < movie.offset().top - $(window).height()) {
                    movie.removeClass('u-movie-active');
                }
            }
        }
    );


    var pcHomeTopBg = [
        {
            bgUrl: {"background-image": "url('http://image.1yingli.cn/img/new/home_background.jpg')"},
            hdShowUrl: "http://image.1yingli.cn/img/new/hd_name.png",
            hdNameUrl: "http://image.1yingli.cn/img/new/title_word.png",
            link: ""
        },
        {
            bgUrl: {"background-image": "url('http://image.1yingli.cn/img/activity/oupeng.jpg')"},
            hdShowUrl: "http://image.1yingli.cn/img/activity/oupengtext.png",
            hdNameUrl: "",
            link: "http://www.1yingli.cn/passage/40"
        },
        {
            bgUrl: {"background-image": "url('http://image.1yingli.cn/img/activity/maerdaifu.jpg')"},
            hdShowUrl: "http://image.1yingli.cn/img/activity/maerdaifutext.png",
            hdNameUrl: "",
            link: "http://www.1yingli.cn/passage/41"
        },
        {
            bgUrl: {"background-image": "url('http://image.1yingli.cn/img/activity/lutian.jpg')"},
            hdShowUrl: "http://image.1yingli.cn/img/activity/lutiantext.png",
            hdNameUrl: "",
            link: "http://www.1yingli.cn/passage/31"
        }
    ];

    app.controller('HomeController', ['$scope', 'SearchAutoCompleteService',
        'ThemeService', '$location', 'HotTeacherService', 'ServiceService', home]);


    /**
     * @memberOf app
     * @ngdoc controller
     * @name HomeController
     * @param {object} $scope [scope](https://docs.angularjs.org/guide/scope)
     * @param {Service} SearchAutoCompleteService [SearchAutoCompleteService](app.SearchAutoCompleteService.html)
     * @param {Service} ThemeService [ThemeService](app.ThemeService.html)
     * @param {object} $location [$location](https://docs.angularjs.org/api/ng/service/$location)
     * @param {Service} HotTeacherService [HotTeacherService](app.HotTeacherService.html)
     * @desc
     *  首页Controller
     */
    function home($scope, SearchAutoCompleteService, ThemeService, $location, HotTeacherService, ServiceService) {
        $scope.themeService = ThemeService;
        $scope.serviceService = ServiceService;
        $scope.searchAutoCompleteService = SearchAutoCompleteService;
        $scope.searchWord = "";
        $scope.pcHomeTopBg = pcHomeTopBg;
        //$scope.searchType = 0;
        $scope.show = show;
        $scope.hide = hide;
        $scope.mouseEnter = mouseEnter;
        $scope.mouseLeave = mouseLeave;
        $scope.playMovie = playMovie;
        $scope.searchAPI = SearchAutoCompleteService.searchAPI;
        $scope.stopPlay = stopPlay;
        $scope.toTeacher = toTeacher;
        $scope.hotTeachers = HotTeacherService;
        $scope.getArray = getArray;
        $scope.changeWord = changeWord;
        $scope.inputChanged = inputChanged;
        $scope.onKeyDown = onKeyDown;
        $scope.toSearch = toSearch;
        $scope.showThemeText = 0;
        $scope.changeShowText = changeShowText;
        $scope.showTopPre = showTopPre;
        $scope.showTopNext = showTopNext;
        $scope.makeArray = makeArray;


        /**
         *
         * @param {object} event
         */
        function show() {
            $(".m-type-select").css('display', 'block');
        }

        function hide() {
            $(".m-type-select").css('display', 'none');
        }

        function mouseEnter(e) {
            $(e.currentTarget).removeClass('f-fade-in');
            $(e.currentTarget).addClass('f-fade-in');
        }

        function mouseLeave(e) {
            $(e.currentTarget).removeClass('f-fade-in');
        }

        function playMovie() {
            $('#movie').show();
            var player = new Clappr.Player({
                source: "http://video.1yingli.cn/onemile.mp4",
                width: 1080,
                height: 608,
                parentId: "#playerShow",
                autoPlay: true,
                mute: false,
                poster: "http://image.1yingli.cn/img/green.png"
            });
        }

        function stopPlay() {
            $("#movie").hide();
            $("#playerShow").html(null);
        }


        function toTeacher(id) {
            $location.path('/teacher/' + id);
        }

        function getArray(number) {
            return new Array(parseInt(number));
        }

        //搜索框回调函数
        function changeWord(item) {
            $scope.searchWord = item.title;
            toSearch();
        }

        function inputChanged(input) {
            $scope.searchWord = input;
        }

        function onKeyDown(event) {
            if (event.keyCode == 13) {
                toSearch();
            }
        }

        function toSearch() {
            var params = {
                'word': $scope.searchWord,
                'searchType': SearchAutoCompleteService.searchType
            };
            $location.path('/search').search(params);
        }


        function changeShowText(index, data) {
            $scope.showThemeText = index;
            $scope.themeTitle = data.name;
            $scope.themeText = data.name;
        }

        function showTopPre(id) {
            $(id + ' .prev').click()
        }

        function showTopNext(id) {
            $(id + ' .next').click()
        }

        function makeArray(num) {
            var array = new Array(num);
            return array;
        }

    }
})();
