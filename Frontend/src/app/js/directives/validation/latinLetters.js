groupApp.directive('validateContainsLatinLetters', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, controller) {
            function latinLetterValidator(ngModelValue) {
                if (/^[a-zA-Z0-9_.-]*$/.test(ngModelValue)) {
                    controller.$setValidity('latinletterValidator', true);
                } else {
                    controller.$setValidity('latinletterValidator', false)
                }

                return ngModelValue;
            }
            controller.$parsers.push(latinLetterValidator);
        }
    };
});