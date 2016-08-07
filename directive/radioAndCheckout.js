(function() {
    app.directive('dirRadio', function () {
        return {
            restrict : 'EA',
            replace : true,
            scope : {
                name : '@name',
                id : '@id',
                title: '@title'
            },
            template : "<label class='u-t-radio' ng-class=\"{'u-t-radio-active':checked}\" >" +
                       "<input type='radio' name='{{name}}' id='{{id}}' ng-checked='{{checked}}'>" +
                       "</label>",
            link: function(scope, elem, attrs){

                if(!scope.title || scope.title == 'false'){
                    scope.checked = false;
                } else {
                    scope.checked = true;
                }

                elem.bind('click', function() {
                    var isTitle = elem.attr('title');

                    var object = $("label[name = "+scope.name+"]");
                    object.attr('title', false);

                    if(!isTitle || isTitle == 'false'){
                        elem.attr('title', true);
                    } else {
                        elem.attr('title', false);
                    }

                    scope.$apply(function(){
                        scope.checked = !scope.checked;
                    })
                });
            }
        }
    });

    app.directive('dirCheckout',function () {
        return {
            restrict : 'EA',
            replace : true,
            scope : {
                name : '@name',
                id : '@id',
                checked: '@checked'
            },
            template : "<label ng-click='isChoose = !isChoose' ng-class=\"{'u-t-check-active': isChoose}\" class='u-t-check'>√<input name='{{name}}' id='{{id}}' type='checkbox' ng-checked='isChoose'></label>",
            link: function(scope, elem, attrs){
                scope.isChoose = false;
                if(scope.checked){
                    scope.isChoose = true;
                }
		    }
        }
    });

})();