const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Service = require('../Class/Service.js');

let service = new Service();

describe('Service', function() {

    describe('getRandomInArray', function(){
        it('should be within 1 and 4', function(){
            let array = [1, 2, 3, 4];
            expect(service.getRandomInArray(array)).to.be.within(1,4);
        });    
    })

    describe('isLetter', function(){
        it('test length letter', function(){
            let letter = 'aa';
            assert.equal(service.isLetter(letter), false);
        });

        it('test accent character é', function(){
            let letter = 'é';
            assert.equal(service.isLetter(letter), true);
        });

        it('test accent character è', function(){
            let letter = 'è';
            assert.equal(service.isLetter(letter), true);
        });

        it('test capitalize letter', function(){
            let letter = 'A';
            assert.equal(service.isLetter(letter), true);
        });

        it('test lowercase letter', function(){
            let letter = 'b';
            assert.equal(service.isLetter(letter), true);
        });
    
    });

    describe('strSearchAll', function(){
        it('test one letter in one string', function(){
            let haystack = 'bonjour';
            let neddle = 'n';
            expect(service.strSearchAll(haystack, neddle)).to.eql([2]);
        });

        it('test a string in the string', function(){
            let haystack = 'bonjour';
            let neddle = 'on';
            expect(service.strSearchAll(haystack, neddle)).to.eql([1]);
        });

        it('test 2 letters ine one string', function(){
            let haystack = 'bonjour';
            let neddle = 'o';
            expect(service.strSearchAll(haystack, neddle)).to.eql([1, 4]);
        });

        it('should be type array', function(){
            let haystack = 'bonjour';
            let neddle = 'o';
            expect(service.strSearchAll(haystack, neddle)).to.be.a('array');
        });

        it('should be an empty array', function(){
            let haystack = 'bonjour';
            let neddle = 'z';
            expect(service.strSearchAll(haystack, neddle)).to.eql([]);
        });
    });

    describe('ReplaceAtIndex', function(){
        it('replace letter', function(){
            let str = "salut";
            let index = 2;
            let chr = 'a';
            assert.equal(service.ReplaceAtIndex(str,index,chr), 'saaut');
        });

        it('replace a letter by 2 letters', function(){
            let str = "salut";
            let index = 2;
            let chr = 'ab';
            assert.equal(service.ReplaceAtIndex(str,index,chr), 'saabut');
        });

        it('test with an offest index', function(){
            let str = "salut";
            let index = 10;
            let chr = 'ab';
            assert.equal(service.ReplaceAtIndex(str,index,chr), 'salut');
        });

        it('test return type', function(){
            let str = "salut";
            let index = 2;
            let chr = 't';
            expect(service.ReplaceAtIndex(str,index,chr)).to.be.a('string');
        });
    });

    describe('replaceAlll', function(){
        it('should replace all i with an p', function(){
            let str = 'plus ultra';
            let find = 'u';
            let replace = 'a';
            expect(service.replaceAll(str, find, replace)).to.eql('plas altra');
        });

        it('test a letter who s not in the string', function(){
            let str = 'plus ultra';
            let find = 'm';
            let replace = 'b';
            expect(service.replaceAll(str, find, replace)).to.eql(str);
        });

        it('test a letter who s not in the string', function(){
            let str = 'plus ultra';
            let find = 'm';
            let replace = 'b';
            expect(service.replaceAll(str, find, replace)).to.eql(str);
        });

        it('test a letter who s not in the string', function(){
            let str = 'plus ultra';
            let find = 'm';
            let replace = 'b';
            expect(service.replaceAll(str, find, replace)).to.be.a('string');
        });
    });

    describe('searchInStrings', function(){
        it('test with a undefing value inside the array', function(){
            let needle = 'a';
            let array = ['undefind'];
            assert.equal(service.searchInStrings(needle, array), false);
        });

        it('test with a word inside the string', function(){
            let needle = 'hello';
            let array = ['hello world'];
            assert.equal(service.searchInStrings(needle, array), 'hello world');
        });

        it('test type string', function(){
            let needle = 'hello';
            let array = ['hello world'];
            expect(service.searchInStrings(needle, array)).to.be.a('string');
        });
    });

    describe('formatAsSlug', function(){
        it('test string with one space between word', function(){
            let string = "hello my friend";
            assert.equal(service.formatAsSlug(string), "hello-my-friend");
        });

        it('test string with 2 spaces between word', function(){
            let string = "hello  my  friend";
            assert.equal(service.formatAsSlug(string), "hello--my--friend");
        });

        it('test string with extrat space at the end', function(){
            let string = "hello my friend ";
            assert.equal(service.formatAsSlug(string), "hello-my-friend-");
        });
        
        it('test return type, should be a string', function(){
            let string = "hello my friend ";
            expect(service.formatAsSlug(string)).to.be.a('string');
        });
    });

    describe('areSpecialChar', function(){
        it('test normal string', function(){
            let string = "hi there";
            assert.equal(service.areSpecialChar(string), true);
        });

        it('test accent string', function(){
            let string = "ééééé";
            assert.equal(service.areSpecialChar(string), false);
        });

        it('test special character', function(){
            let string = ")àçççç";
            assert.equal(service.areSpecialChar(string), false);
        });

        it('test return type, sould be a boolean', function(){
            let string = "eeeee";
            expect(service.areSpecialChar(string)).to.be.a('boolean');
        });
    })
});