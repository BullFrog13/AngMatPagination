groupApp.directive('validateGroupName', function(GroupService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, controller) {
            debugger;

            function customValidator1(ngModelValue) {
                var groups = GroupService.getAllGroups();

                for (var i = 0; i < groups.length; i++) {
                    if (groups[i].name === ngModelValue) {
                        controller.$setValidity('groupNameValidator', false);
                        break;
                    } else {
                        controller.$setValidity('groupNameValidator', true);
                    }
                }

                return ngModelValue;
            }
            controller.$parsers.push(customValidator1);
        }
    };
});