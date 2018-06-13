const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jane',
            room: 'React Course'
        },{
            id: '3',
            name: 'Angelina',
            room: 'Node Course'
        }]
    });

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Wayne',
            room: 'The Office Fans'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    //Remove User
    it('Should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(userId).toBe('1');
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    //Find User
    it('Should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe('2');
    });

    it('Should not find User', () => {
        var userId = '4';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });


    it('Should return names for Node Course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Angelina']);
    });
    it('Should return names for React Course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jane']);
    });
});
