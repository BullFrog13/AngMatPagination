groupApp.controller('TagController', function($scope, $q, UserService, SelectedUserService, GroupService, NotificationService) {
    var viewModel = this;

    viewModel.selectedUsers = []
    viewModel.selectedItem = null;
    viewModel.searchText = null;
    viewModel.querySearch = querySearch;
    viewModel.selectedItemChange = selectedItemChange;
    viewModel.synchronizeSelectedUsers = synchronizeSelectedUsers;
    viewModel.removeUserFromSelected = removeUserFromSelected;

    loadData();

    function loadData() {
        if (!UserService.getLoadingData()) {
            UserService.loadUsers();
        }

        loadSelectedUsers();
    }

    function loadSelectedUsers() {
        var selectedGroup = GroupService.getSelectedGroup();
        var selectedGroupMemebers = selectedGroup ? selectedGroup.members.slice(0) : [];
        SelectedUserService.addUsers(selectedGroupMemebers);
        viewModel.selectedUsers = SelectedUserService.getUsers();
    }

    function querySearch(query) {
        var results = UserService.filterUsers(query);

        var deferred = $q.defer();
        deferred.resolve(results);

        return deferred.promise;
    }

    function selectedItemChange(user) {
        if (user && !containsObject(user, viewModel.selectedUsers)) {
            SelectedUserService.addUser(user);
            viewModel.selectedUsers = SelectedUserService.getUsers();
        }

        viewModel.searchText = '';
    }

    function containsObject(obj, list) {
        for (var i = 0; i < viewModel.selectedUsers.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }

    function removeUserFromSelected(user) {
        SelectedUserService.removeUser(user);
        viewModel.selectedUsers = SelectedUserService.getUsers();
    }

    function synchronizeSelectedUsers() {
        GroupService.setSelectedGroupUsers(viewModel.selectedUsers);
        NotificationService.broadcast('userSync');
    }

    NotificationService.subscribe('userDeleted', function(event, user) {
        SelectedUserService.removeUser(user);
        viewModel.selectedUsers = SelectedUserService.getUsers();
    }, $scope);

    NotificationService.subscribe('groupSelected', function(event) {
        SelectedUserService.resetUsers();
        loadSelectedUsers();
    }, $scope);
});