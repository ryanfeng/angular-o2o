(function () {
    app.controller('HelpController', ['$scope', help]);
    function help($scope) {
        $('body').scrollTop(0);
        $scope.scroll = scroll;

        function scroll(id) {
            var top = $(id).offset().top;
            $('body').animate({scrollTop: top - 100}, '2000');
        }
    }
})();