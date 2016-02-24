(function(angular){
    angular
        .module('alexhgian.angular-cloud', [])
        .factory('SC', ['$window', function ($window) {
            var SC = $window.SC;

            try {
                delete $window.SC
            } catch(e) {
                $window.SC = undefined;
            }

            return SC;
        }]);
})(angular);

