[{
    id: 'xvcvcvcv',
    name: 'Wayne',
    room: 'The Office Fans'
}]

//Add user (id, name, room)
//removeUser(id) --> id is he socket.id
//getUser(id)
//getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return user that was removed
        var user = this.users.filter((user) => user.id === id)[0];
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];


    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user)=> user.name);

        return namesArray;
    }
}

module.exports = {Users};