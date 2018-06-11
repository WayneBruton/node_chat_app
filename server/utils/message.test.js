const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate the correct message', () => {
        var from = 'Sandra';
        var text = 'Some text message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from,text });
    });
    
    
});

describe('generateLocationMessage', () => {
    it('Should generate the coordinates', () => {
        var from = 'User';
        var latitude = 12345;
        var longitude = -12345;
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.url).toBeA('string');
        expect(message.url).toBe('https://www.google.com/maps?=12345,-12345');
        expect(message.createdAt).toBeA('number');
    });
});
