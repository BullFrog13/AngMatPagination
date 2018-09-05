groupApp.factory('NotificationService', function($rootScope) {
    return {
        subscribe: function(eventName, callback, scope) {
            var handler = scope.$on(eventName, callback);
            scope.$on('$destroy', handler);
        },

        broadcast: function(eventName, data) {
            $rootScope.$broadcast(eventName, data);
        }
    }
});