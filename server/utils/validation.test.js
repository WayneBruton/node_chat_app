const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        var res = isRealString(123);
        expect(res).toBe(false);
    });
    it('Should reject strings with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });
    it('Should accepct allow strings with non space characters', () =>{
        var res = isRealString('   Wayne   ');
        expect(res).toBe(true);
    })
});