groupApp.controller('GroupController', function($scope, GroupService, NotificationService) {

    var viewModel = this;
    viewModel.groups = [];
    viewModel.selectedGroupName = '';
    viewModel.selected;

    viewModel.createGroup = function() {
        viewModel.groups = [];
        GroupService.createGroup(viewModel.newGroup);
        viewModel.groups = GroupService.getAllGroups();

        viewModel.newGroup.name = '';
    }

    viewModel.selectGroup = function(group) {
        if (group.name !== viewModel.selectedGroupName) {
            GroupService.selectGroup(group);
            var selectedGroup = GroupService.getSelectedGroup()
            viewModel.selectedGroupName = selectedGroup.name;

            NotificationService.broadcast('groupSelected')
        }
    }

    viewModel.DeleteUserFromGroup = function(group, user) {
        GroupService.deleteUserFromGroup(group, user);
        viewModel.groups = GroupService.getAllGroups();

        NotificationService.broadcast('userDeleted', user)
    }

    viewModel.GroupIsEmpty = function(group) {
        if (group.members.length == 0) {
            return true;
        }

        return false;
    }

    NotificationService.subscribe('userSync', function(event) {
        viewModel.groups = GroupService.getAllGroups();
    }, $scope);

    NotificationService.subscribe('userAdded', function(event) {
        viewModel.groups = GroupService.getAllGroups();
    }, $scope);
});