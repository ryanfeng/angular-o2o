(function () {


    function newDate() {
        return {
            yearSt: 2015,
            monthSt: 1,
            yearEd: '至今',
            monthEd: 1
        };
    }

    app.controller("Bct2Controller", ['$scope', 'BecomeTeacherService', 'AlertService',
        '$location', 'SessionService', bct1Controller]);
    function bct1Controller($scope, BecomeTeacherService, AlertService, $location, SessionService) {
        $scope.yearSt = BecomeTeacherService.yearSt;
        $scope.yearEd = BecomeTeacherService.yearEd;
        $scope.months = BecomeTeacherService.months;

        //编辑学校经历
        $scope.isAddSchool = true;
        $scope.schoolEditType = 1000;
        $scope.schools = [];
        $scope.school = newDate();
        $scope.isSchNameShow = false;
        $scope.isSchEduShow = false;
        $scope.isSchMajorShow = false;
        $scope.isAddCompany = true;
        $scope.companyEditType = 1000;
        $scope.companys = [];
        $scope.company = newDate();

        $scope.isWordNameShow = false;
        $scope.isWorkPosiShow = false;


        $scope.saveSchool = saveSchool;
        $scope.closeAddSchool = closeAddSchool;
        $scope.editSchool = editSchool;
        $scope.addSchool = addSchool;
        $scope.deleteSchool = deleteSchool;

        if (!SessionService.isLogin()) {
            $location.path('login');
        } else if (SessionService.user.teacherId) {
            $location.path('/');
        }

        function saveSchool() {
            if (!$scope.school.name) {
                $scope.isSchNameShow = true;
            }
            if (!$scope.school.education) {
                $scope.isSchEduShow = true;
            }
            if (!$scope.school.major) {
                $scope.isSchMajorShow = true;
            }
            if (!$scope.isSchNameShow && !$scope.isSchEduShow && !$scope.isSchMajorShow) {
                if ($scope.school.yearEd == "至今") {
                    $scope.school.time = $scope.school.yearSt + "年" + $scope.school.monthSt + "月-" + $scope.school.yearEd;
                } else {
                    $scope.school.time = $scope.school.yearSt + "年" + $scope.school.monthSt + "月-" + $scope.school.yearEd + "年" + $scope.school.monthEd + "月";
                }
                var oldSchool = {};
                oldSchool.name = $scope.school.name;
                oldSchool.education = $scope.school.education;
                oldSchool.major = $scope.school.major;
                oldSchool.time = $scope.school.time;
                if ($scope.school.exprience == undefined) {
                    $scope.school.exprience = "";
                }
                oldSchool.exprience = $scope.school.exprience;
                oldSchool.yearSt = $scope.school.yearSt;
                oldSchool.monthSt = $scope.school.monthSt;
                oldSchool.yearEd = $scope.school.yearEd;
                oldSchool.monthEd = $scope.school.monthEd;
                if ($scope.schoolEditType == 1000) {
                    $scope.schools.push(oldSchool);
                } else {
                    $scope.schools[$scope.schoolEditType] = oldSchool;
                }
                $scope.isAddSchool = false;
                $scope.schoolEditType = 1000;
            }
        }


        function closeAddSchool() {
            $scope.isAddSchool = false;
        }


        function editSchool(index) {
            $scope.isAddSchool = true;
            $scope.school = $.extend(true, {}, $scope.schools[index]);
            /*.name = .name;
             $scope.school.education = $scope.schools[index].education;
             $scope.school.major = $scope.schools[index].major;
             $scope.school.time = $scope.schools[index].time;
             $scope.school.exprience = $scope.schools[index].exprience;
             $scope.school.yearSt = $scope.schools[index].yearSt;
             $scope.school.monthSt = $scope.schools[index].monthSt;
             $scope.school.yearEd = $scope.schools[index].yearEd;
             $scope.school.monthEd = $scope.schools[index].monthEd;*/
            $scope.schoolEditType = index;
        }


        function addSchool() {
            $scope.school = newDate();
            $scope.isAddSchool = true;
        }


        function deleteSchool(index) {
            $scope.schools.splice(index, 1);
        }


        $scope.saveCompany = saveCompany;
        function saveCompany() {
            if (!$scope.company.name) {
                $scope.isWordNameShow = true;
            }
            if (!$scope.company.position) {
                $scope.isWorkPosiShow = true;
            }
            if ($scope.isWorkPosiShow || $scope.isWordNameShow) {
                return;
            }
            if ($scope.company.yearEd == "至今") {
                $scope.company.time = $scope.company.yearSt + "年" + $scope.company.monthSt + "月-" + $scope.company.yearEd;
            } else {
                $scope.company.time = $scope.company.yearSt + "年" + $scope.company.monthSt + "月-" + $scope.company.yearEd + "年" + $scope.company.monthEd + "月";
            }
            var oldCompany = {};
            oldCompany.name = $scope.company.name;
            oldCompany.position = $scope.company.position;
            oldCompany.time = $scope.company.time;
            if ($scope.company.exprience == undefined) {
                $scope.company.exprience = "";
            }
            oldCompany.exprience = $scope.company.exprience;
            oldCompany.yearSt = $scope.company.yearSt;
            oldCompany.monthSt = $scope.company.monthSt;
            oldCompany.yearEd = $scope.company.yearEd;
            oldCompany.monthEd = $scope.company.monthEd;
            if ($scope.companyEditType == 1000) {
                $scope.companys.push(oldCompany);
            } else {
                $scope.companys[$scope.companyEditType] = oldCompany;
            }
            $scope.isAddCompany = false;
            $scope.companyEditType = 1000;
        }

        $scope.closeAddCompany = closeAddCompany;
        function closeAddCompany() {
            $scope.isAddCompany = false;
        }

        $scope.editCompany = editCompany;
        function editCompany(index) {
            $scope.isAddCompany = true;
            $scope.company = $.extend(true, {}, $scope.companys[index]);
            /*$scope.company.name = $scope.companys[index].name;
             $scope.company.position = $scope.companys[index].position;
             $scope.company.time = $scope.companys[index].time;
             $scope.company.exprience = $scope.companys[index].exprience;
             $scope.company.yearSt = $scope.companys[index].yearSt;
             $scope.company.monthSt = $scope.companys[index].monthSt;
             $scope.company.yearEd = $scope.companys[index].yearEd;
             $scope.company.monthEd = $scope.companys[index].monthEd;*/
            $scope.companyEditType = index;
        }

        $scope.addCompany = addCompany;
        function addCompany() {
            $scope.company = {};
            $scope.isAddCompany = true;
            $scope.company.yearSt = 2015;
            $scope.company.monthSt = 1;
            $scope.company.yearEd = '至今';
            $scope.company.monthEd = 1;
        }

        $scope.deleteCompany = deleteCompany;
        function deleteCompany(index) {
            $scope.companys.splice(index, 1);
        }

        if (!BecomeTeacherService.teacher.name) {
            $location.path("/bct1");
        }

        //数据提交
        $scope.submitData = submitData;
        function submitData() {
            if ($scope.schools.length == 0 && $scope.companys.length == 0) {
                AlertService.showAlert('教育和工作背景至少填写一个!', undefined);
                //页面滚动到页面头部
                $('body').scrollTop(700);
                return;
            }
            var teacher = {};
            teacher.name = BecomeTeacherService.teacher.name;
            teacher.phone = BecomeTeacherService.teacher.phone;
            teacher.contact = BecomeTeacherService.teacher.weixin;
            teacher.mail = BecomeTeacherService.teacher.email;
            teacher.address = BecomeTeacherService.teacher.address;
            teacher.studyExperience = $scope.schools;
            teacher.workExperience = $scope.companys;
            for (var i = 0; i < teacher.studyExperience.length; i++) {
                var schoolEx = {};
                schoolEx.schoolName = teacher.studyExperience[i].name;
                schoolEx.degree = teacher.studyExperience[i].education;
                schoolEx.major = teacher.studyExperience[i].major;
                schoolEx.description = teacher.studyExperience[i].exprience;
                schoolEx.startTime = teacher.studyExperience[i].yearSt + "," + teacher.studyExperience[i].monthSt;
                if (teacher.studyExperience[i].yearEd == '至今') {
                    schoolEx.endTime = teacher.studyExperience[i].yearEd;
                } else {
                    schoolEx.endTime = teacher.studyExperience[i].yearEd + "," + teacher.studyExperience[i].monthEd;
                }
                teacher.studyExperience[i] = schoolEx;
            }
            for (i = 0; i < teacher.workExperience.length; i++) {
                var workEx = {};
                workEx.companyName = teacher.workExperience[i].name;
                workEx.position = teacher.workExperience[i].position;
                workEx.description = teacher.workExperience[i].exprience;
                workEx.startTime = teacher.workExperience[i].yearSt + "," + teacher.workExperience[i].monthSt;
                if (teacher.workExperience[i].yearEd == '至今') {
                    workEx.endTime = teacher.workExperience[i].yearEd;
                } else {
                    workEx.endTime = teacher.workExperience[i].yearEd + "," + teacher.workExperience[i].monthEd;
                }
                teacher.workExperience[i] = workEx;
            }
            BecomeTeacherService.becomeTeacher(teacher);
        }

        function changeEndYear(index) {
            if (index == 1) {
                if ($scope.school.yearEd == '至今') {
                    $scope.school.monthEd = null;
                }
            } else {
                if ($scope.company.yearEd == '至今') {
                    $scope.company.monthEd = null;
                }
            }
        }
    }
})();
