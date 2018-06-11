const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate the correct message', () => {
        var from = 'Sandra';
        var text = 'Some text message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from,text });
    });
});
