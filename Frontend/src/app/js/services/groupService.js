groupApp.factory('GroupService', function(Group) {

    var groups = [];
    var selectedGroup;

    return {
        getAllGroups: getAllGroups,
        createGroup: createGroup,
        selectGroup: selectGroup,
        groupIsSelected: groupIsSelected,
        getSelectedGroup: getSelectedGroup,
        addUserToSelectedGroup: addUserToSelectedGroup,
        addUsersToSelectedGroup: addUsersToSelectedGroup,
        deleteUserFromGroup: deleteUserFromGroup,
        setSelectedGroupUsers: setSelectedGroupUsers,
        getSelectedGroupUsers: getSelectedGroupUsers
    }

    function createGroup(group) {
        var newGroup = Group.build(group);
        groups.push(newGroup);
    }

    function selectGroup(group) {
        if (group === selectedGroup) {
            return;
        }

        for (var i = 0; i < groups.length; i++) {
            if (groups[i] === group) {
                selectedGroup = group;
            }
        }
    }

    function getAllGroups() {
        return groups;
    }

    function getSelectedGroup() {
        return selectedGroup;
    }

    function groupIsSelected() {
        return selectedGroup ? true : false;
    }

    function getSelectedGroupUsers() {
        return selectedGroup ? selectedGroup.members : []
    }

    function addUserToSelectedGroup(user) {
        if (selectedGroup) {
            if (!userIsGroupMember(selectedGroup, user)) {
                selectedGroup.members.push(user);
            }
        }
    }

    function addUsersToSelectedGroup(users) {
        if (selectedGroup) {
            users.forEach(function(user) {
                if (!userIsGroupMember(selectedGroup, user)) {
                    selectedGroup.members.push(user);
                }
            }, this);
        }
    }

    function deleteUserFromGroup(group, user) {
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].name === group.name) {
                var index = groups[i].members.indexOf(user);
                groups[i].members.splice(index, 1);
            }
        }
    }

    function setSelectedGroupUsers(users) {
        if (selectedGroup) {
            selectedGroup.members = users.slice(0);
        }
    }

    function userIsGroupMember(group, user) {
        var result = false;
        for (var i = 0; i < group.members.length; i++) {
            if (group.members[i].id === user.id) {
                result = true;
                break;
            }
        }

        return result;
    }
});