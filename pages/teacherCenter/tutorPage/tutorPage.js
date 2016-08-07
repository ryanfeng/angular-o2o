(function () {
    var years = [];
    var months = [];

    for (var i = parseInt((new Date).getFullYear()); i > 1980; i--) {
        years.push(i + '');
    }
    for (i = 1; i < 13; i++) {
        months.push(i + '');
    }

    var valide = [
        /*{
            name: 'timeperweek',
            min: 0,
            text: "请输入合法的可约次数"
        },*/
        {
            name: 'price',
            min: 0.01,
            text: "请输入合法的价格，最低价格为0.01"
        },
        //{
        //    name: 'serviceTime',
        //    min: 0.5,
        //    text: "请输入合法的咨询时间，最短时间为0.5小时"
        //},
        //{
        //    name: 'pricetemp',
        //    min: 0.01,
        //    text: "请输入合法的折后价格，最低价格为0.01",
        //    status: false
        //}
    ]

    app.controller('TutorPageController', ['$scope', 'TeacherCenterService', 'HttpService', '$location', 'AlertService', tutorPage]);
    function tutorPage($scope, TeacherCenterService, HttpService, $location, AlertService) {
        $scope.studyExperience = {};
        $scope.workExperience = {};
        $scope.showStudy = false;
        $scope.editStudyIndex = -1;
        $scope.showWork = false;
        $scope.editWorkIndex = -1;
        $scope.years = years;
        $scope.months = months;

        $scope.getBackground = getBackground;
        $scope.changeStudy = changeStudy;
        $scope.saveStudy = saveStudy;
        $scope.addStudy = addStudy;
        $scope.removeStudy = removeStudy;
        $scope.changeWork = changeWork;
        $scope.saveWork = saveWork;
        $scope.addWork = addWork;
        $scope.removeWork = removeWork;
        $scope.changeEndYear = changeEndYear;
        $scope.changeEndMonth = changeEndMonth;
        $scope.reset = reset;
        $scope.toPreview = toPreview;
        $scope.save = save;
        $scope.isShowBGPanel = false;
        $scope.showTrueUrl = "";
        $scope.changeBg = changeBg;
        $scope.subChangeBg = subChangeBg;

        $scope.formatInteger = function () {
            var reg = /^[1-9]+[0-9]*]*$/;
            if (isNaN($scope.data.timeperweek) || !reg.test($scope.data.timeperweek)) {
                $scope.data.timeperweek = 0;
            }
        }
        $scope.formatNumber = function () {
            if (isNaN($scope.data.price) || $scope.data.price <= 0) {
                $scope.data.price = 0.1;
            } else {
                ($scope.data.onsale ? ($scope.data.price < $scope.data.pricetemp ? $scope.data.pricetemp = $scope.data.price : $scope.data.pricetemp) : $scope.data.price)
            }
        }
        $scope.formatNumber1 = function () {
            if (isNaN($scope.data.pricetemp) || $scope.data.pricetemp < 0) {
                $scope.data.pricetemp = 0;
            } else {
                ($scope.data.price < $scope.data.pricetemp ? $scope.data.pricetemp = $scope.data.price : $scope.data.pricetemp)
            }
        }

        if (TeacherCenterService.teacherInfo == undefined) {
            TeacherCenterService.getTeacherInfo();
        } else {
            $scope.data = TeacherCenterService.teacherInfo;
        }
        TeacherCenterService.changeMenuIndex(-1);
        $scope.$on('getTeacherInfo', onGetTeacherInfo);
        function onGetTeacherInfo(event, data) {
            $scope.data = data;
        }

        function subChangeBg() {
            $scope.data.bgUrl = $scope.showTrueUrl.replace("@!bg", "");
            $scope.isShowBGPanel = false;
        }

        function changeBg(url) {
            $scope.showTrueUrl = url;
        }

        function changeStudy(index) {
            $scope.showStudy = true;
            $scope.editStudyIndex = index;
            $scope.studyExperience = $.extend(true, {}, $scope.data.studyExperience[index]);

            $scope.studyExperience.startYear = $scope.studyExperience.startTime.split(',')[0];
            $scope.studyExperience.startMonth = $scope.studyExperience.startTime.split(',')[1];
            if ($scope.studyExperience.endTime == '至今') {
                $scope.studyExperience.endYear = '0';
                $scope.studyExperience.endMonth = '0';
            } else {
                $scope.studyExperience.endYear = $scope.studyExperience.endTime.split(',')[0];
                $scope.studyExperience.endMonth = $scope.studyExperience.endTime.split(',')[1];
            }
        }

        function saveStudy() {
            if(!$scope.studyExperience){
                AlertService.showAlert("教育经历信息不能为空", undefined);
                return;
            }
            $scope.showStudy = false;
            !$scope.studyExperience.schoolName?$scope.studyExperience.schoolName='':'';
            !$scope.studyExperience.degree?$scope.studyExperience.degree='':'';
            !$scope.studyExperience.major?$scope.studyExperience.major='':'';
            !$scope.studyExperience.startYear?$scope.studyExperience.startYear='NO':'';
            !$scope.studyExperience.startMonth?$scope.studyExperience.startMonth='NO':'';
            !$scope.studyExperience.endYear?$scope.studyExperience.endYear='NO':'';
            !$scope.studyExperience.endMonth?$scope.studyExperience.endMonth='NO':'';

            $scope.studyExperience.description = "";
            $scope.studyExperience.startTime = $scope.studyExperience.startYear + ',' + $scope.studyExperience.startMonth;
            $scope.studyExperience.endTime = $scope.studyExperience.endYear + ',' + $scope.studyExperience.endMonth;
            if ($scope.studyExperience.endYear == 0 || $scope.studyExperience.endMonth == 0) {
                $scope.studyExperience.endTime = '至今';
            }

            if ($scope.editStudyIndex != -1) {
                $scope.data.studyExperience[$scope.editStudyIndex] = $scope.studyExperience;
            } else {
                $scope.data.studyExperience.push($scope.studyExperience);
            }
        }

        function addStudy() {
            if ($scope.showStudy) {
                $scope.showStudy = false;
                return;
            }
            $scope.showStudy = true;
            $scope.editStudyIndex = -1;
            $scope.studyExperience = undefined;
        }


        function removeStudy(index) {
            if (index > -1 && index < $scope.data.studyExperience.length) {
                $scope.data.studyExperience.splice(index, 1);
            }
            if (index == $scope.editStudyIndex) {
                $scope.showStudy = false;
                $scope.studyExperience = undefined;
            }
        }

        function changeWork(index) {
            $scope.showWork = true;
            $scope.editWorkIndex = index;
            $scope.workExperience = $.extend(true, {}, $scope.data.workExperience[index]);
            $scope.workExperience.startYear = $scope.workExperience.startTime.split(',')[0];
            $scope.workExperience.startMonth = $scope.workExperience.startTime.split(',')[1];
            if ($scope.workExperience.endTime == '至今') {
                $scope.workExperience.endYear = '0';
                $scope.workExperience.endMonth = '0';
            } else {
                $scope.workExperience.endYear = $scope.workExperience.endTime.split(',')[0];
                $scope.workExperience.endMonth = $scope.workExperience.endTime.split(',')[1];
            }
        }

        function saveWork() {
            if(!$scope.workExperience){
                AlertService.showAlert("工作经历信息不能为空", undefined);
                return;
            }
            $scope.showWork = false;
            !$scope.workExperience.companyName?$scope.workExperience.companyName='':'';
            !$scope.workExperience.position?$scope.workExperience.position='':'';
            !$scope.workExperience.startYear?$scope.workExperience.startYear='NO':'';
            !$scope.workExperience.startMonth?$scope.workExperience.startMonth='NO':'';
            !$scope.workExperience.endYear?$scope.workExperience.endYear='NO':'';
            !$scope.workExperience.endMonth?$scope.workExperience.endMonth='NO':'';

            $scope.workExperience.startTime = $scope.workExperience.startYear + ',' + $scope.workExperience.startMonth;
            $scope.workExperience.endTime = $scope.workExperience.endYear + ',' + $scope.workExperience.endMonth;
            $scope.workExperience.description = '';
            if ($scope.workExperience.endYear == 0 || $scope.workExperience.endMonth == 0) {
                $scope.workExperience.endTime = '至今';
            }

            if ($scope.editWorkIndex != -1) {
                $scope.data.workExperience[$scope.editWorkIndex] = $scope.workExperience;
            } else {
                $scope.data.workExperience.push($scope.workExperience);
            }
        }

        function addWork() {
            if ($scope.showWork) {
                $scope.showWork = false;
                return;
            }
            $scope.showWork = true;
            $scope.editWorkIndex = -1;
            $scope.workExperience = undefined;
        }


        function removeWork(index) {
            if (index > -1 && index < $scope.data.workExperience.length) {
                $scope.data.workExperience.splice(index, 1);
            }
            if (index == $scope.editWorkIndex) {
                $scope.showWork = false;
                $scope.workExperience = undefined;
            }
        }

        function changeEndYear(index) {
            if (index == 1) {
                if ($scope.studyExperience.endYear == '0') {
                    $scope.studyExperience.endMonth = '0';
                } else {
                    if ($scope.studyExperience.endMonth == '0') {
                        $scope.studyExperience.endMonth = '1';
                    }
                }
            } else {
                if ($scope.workExperience.endYear == '0') {
                    $scope.workExperience.endMonth = '0';
                } else {
                    if ($scope.workExperience.endMonth == '0') {
                        $scope.workExperience.endMonth = '1';
                    }
                }
            }
        }

        function changeEndMonth(index) {
            if (index == 1) {
                if ($scope.studyExperience.endMonth == '0' && $scope.studyExperience.endYear != '0') {
                    $scope.studyExperience.endYear = '0';
                } else {
                    if ($scope.studyExperience.endYear == '0') {
                        $scope.studyExperience.endYear = $scope.years[0];
                    }
                }
            } else {
                if ($scope.workExperience.endMonth == '0' && $scope.workExperience.endYear != '0') {
                    $scope.workExperience.endYear = '0';
                } else {
                    if ($scope.workExperience.endYear == '0') {
                        $scope.workExperience.endYear = $scope.years[0];
                    }
                }
            }
        }

        function reset() {
            TeacherCenterService.getTeacherInfo();
        }

        function toPreview() {
            TeacherCenterService.teacherInfo = $scope.data;
            $location.path('teacherPreview');
        }

        function check(data) {
            if (data.status === false) {
                return true;
            }
            if ($scope.data[data.name] === undefined || $scope.data[data.name] < data.min) {
                AlertService.showAlert(data.text, undefined);
                return false;
            }
            return true;
        }

        function save() {
            //$scope.data.onsale == 'true'?valide[3].status = true:valide[3].status = false;
            for (data in valide) {
                if (!check(valide[data])) {
                    return;
                }
            }

            $scope.data.time = $scope.data.serviceTime;
            $scope.data.servicetitle = $scope.data.serviceTitle;
            $scope.data.servicecontent = $scope.data.serviceContent;
            $scope.data.studyExperiences = $scope.data.studyExperience;
            $scope.data.workExperiences = $scope.data.workExperience;
            $scope.data.tips = [];
            for (i in  $scope.data.resources) {
                if ($scope.data.resources[i].flag) {
                    $scope.data.tips.push({id: $scope.data.resources[i].id});
                }
            }
            AlertService.showAlertWithCancel("确认保存", alertCallBack);

            function alertCallBack() {
                HttpService.apiGet('teacher', 'editDetailInfo', $scope.data, apiGetCallBack);
            }

            function apiGetCallBack(data) {
                AlertService.showAlert("修改成功", undefined);
                reset();
            }
        }

        function getBackground() {
            TeacherCenterService.getBackground(successCallBack);
            function successCallBack(data) {
                $scope.urls = data;
            }
        }
    }
})();