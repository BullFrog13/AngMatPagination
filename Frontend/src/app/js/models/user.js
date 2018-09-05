groupApp.factory('User', function() {
    function User(id, name, age, grade, job, feedback) {
        this.id = id
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.job = job;

        if (feedback) {
            this.feedback = feedback;
        } else {
            this.feedback = "";
        }
    }

    User.build = function(user) {
        return new User(
            user.id,
            user.name,
            user.age,
            user.grade,
            user.job,
            user.feedback
        );
    }

    return User;
});