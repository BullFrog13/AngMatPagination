groupApp.factory('SelectedUserService', function() {

    var Users = [];

    return {
        addUser: addUser,
        addUsers: addUsers,
        removeUser: removeUser,
        getUsers: getUsers,
        resetUsers: resetUsers
    }

    function getUsers() {
        return Users;
    }

    function resetUsers() {
        Users = [];
    }

    function addUser(user) {
        Users.push(user);
    }

    function addUsers(users) {
        users.forEach(function(user) {
            if (!userIsSelected(user))
                Users.push(user);
        }, this);
    }

    function removeUser(user) {
        var index = findUserIndex(user)
        if (index !== undefined) {
            Users.splice(index, 1);
        }
    }

    function userIsSelected(user) {
        var result = false;
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].id === user.id) {
                result = true;
                break;
            }
        }

        return result;
    }

    function findUserIndex(user) {
        for (var i = 0; i < Users.length; i++) {
            if (Users[i].id === user.id) {
                return i;
            }
        }
    }
});