groupApp.factory('UserService', function($http, $filter, GroupService, User) {

    var users = [];
    var usersAreLoaded = false;

    return {
        loadUsers: loadUsers,
        getUsers: getUsers,
        filterUsers: filterUsers,
        getUsersCount: usersCount,
        getPagedUsers: getPagedUsers,
        getLoadingData: getLoadingData
    };

    function loadUsers() {
        var request = $http.get('resources/data.json');
        request.then(function(response) {
            response.data.forEach(function(user) {
                users.push(User.build(user));
            });
        });

        setLoadingData();

        return request;
    };

    function getUsers() {
        return users;
    }

    function setLoadingData() {
        usersAreLoaded = true;
    }

    function getLoadingData() {
        return usersAreLoaded;
    }

    function usersCount() {
        var userCount = users.length;

        return userCount;
    }

    function getPagedUsers(usersCurrentPage, usersPerPage) {
        var pagedUsers = users.slice(usersCurrentPage * usersPerPage, usersCurrentPage * usersPerPage + usersPerPage);

        return pagedUsers;
    }

    function filterUsers(value) {
        return $filter('filter')(users, value);
    }
});