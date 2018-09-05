groupApp.config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/app/views/tableView.html',
            controller: 'UserController'
        })
        .when('/search', {
            templateUrl: '/app/views/searchView.html',
            controller: 'TagController as ctrl'
        })
        .when('/table', {
            templateUrl: '/app/views/tableView.html',
            controller: 'UserController'
        }).otherwise('/table');

    $locationProvider.html5Mode(true);
});