groupApp.controller('UserController', function($scope, UserService, GroupService, PagingService, NotificationService) {

    $scope.users = [];
    $scope.pager;
    $scope.selectedGroupUsers = [];
    $scope.orderByParameter;

    var filteredUsers = [];

    init();

    function init() {
        if (!UserService.getLoadingData()) {
            UserService.loadUsers().then(function() {
                filteredUsers = UserService.getUsers();
                $scope.selectedGroupUsers = GroupService.getSelectedGroupUsers();
                GetPagination(1, UserService.getUsersCount());
            });
        } else {
            filteredUsers = UserService.getUsers();
            $scope.selectedGroupUsers = GroupService.getSelectedGroupUsers();
            GetPagination(1, UserService.getUsersCount());
        }
    }

    $scope.SetPage = function(page) {
        GetPagination(page, filteredUsers.length);
    }

    $scope.$watch('q', function(val) {
        filteredUsers = UserService.filterUsers(val);
        var filteredUsersLength = filteredUsers.length;
        GetPagination(1, filteredUsersLength);
    });

    $scope.AddUserToSelectedGroup = function(user) {
        GroupService.addUserToSelectedGroup(user);
        $scope.selectedGroupUsers = GroupService.getSelectedGroupUsers();
        NotificationService.broadcast('userAdded')
    }

    $scope.DeleteUserFromGroup = function(group, user) {
        GroupService.deleteUserFromGroup(group, user);
    }

    $scope.groupIsSelectedAndUserIsMember = function(user) {
        var groupSelectedResult = groupIsSelected();

        if (groupSelectedResult) {

            var userIsInSelectedGroupResult = userIsInSelectedGroup(user);

            if (!userIsInSelectedGroupResult) {
                return false;
            }
        }

        return true;
    }

    $scope.orderUsers = function(parameter) {
        $scope.selectedParameter = parameter;
    }

    function userIsInSelectedGroup(user) {
        var result = false;
        for (var i = 0; i < $scope.selectedGroupUsers.length; i++) {
            if ($scope.selectedGroupUsers[i].id === user.id) {
                result = true;
                break;
            }
        }

        return result;
    }

    function groupIsSelected() {
        var result = GroupService.groupIsSelected()

        return result;
    }

    function GetPagination(page, userCount) {
        var pager = PagingService.GetPager(userCount, page, $scope.pageSize);
        $scope.pager = pager;
        $scope.users = filteredUsers.slice(pager.startIndex, pager.endIndex);
    }

    NotificationService.subscribe('userDeleted', function(event, user) {
        $scope.selectedGroupUsers = GroupService.getSelectedGroupUsers();
    }, $scope);

    NotificationService.subscribe('groupSelected', function(event) {
        $scope.selectedGroupUsers = GroupService.getSelectedGroupUsers();
    }, $scope);
});