groupApp.factory('Group', function() {
    function Group(name, members) {
        this.name = name;
        this.isSelected = false;
        if (members) {
            this.members = members;
        } else {
            this.members = [];
        }
    }

    Group.build = function(group) {
        return new Group(
            group.name,
            group.members
        );
    }

    return Group;
});