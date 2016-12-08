var bcrypt = require('bcrypt-nodejs');
//var _ = require('lodash');
var _ = require('ramda');
var config = {
    bcrypt: {
    rounds: 10,
    pepper: [
        '358df10f083c1034580f58aa7469a7fa',
        'b94f1272abf359068306544a7688b62d',
        '0be458d2033ee150196cf8b4f702b91c',
        'a690071d987f4fa1d82d42c1be1cb772']
    }
};

class Encryptor {

    static hash(plainText) {
        const pappered = this.getPepperedText(plainText);
        const salt = bcrypt.genSaltSync(config.bcrypt.rounds || 10);
        return bcrypt.hashSync(pappered, salt);
    }

    static compare(plainText, hash) {
        const pappered = this.getPepperedText(plainText);
        return bcrypt.compareSync(pappered, hash);
    }

    static getPepperedText(plainText) {
        return _.union([plainText], config.bcrypt.pepper).join('');
    }

}

var str = Encryptor.hash("123");
console.log(str);


var result = Encryptor.compare("123","$2a$10$m/bjK63hrXBaNu/QjH3DHOtFmpWHAE/uRK18fOhSYYSpFJ0Rz08Oy");
console.log(result );