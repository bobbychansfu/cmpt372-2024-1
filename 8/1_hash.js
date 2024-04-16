const { createHash } = require('crypto');

function hash(input){
    return createHash('sha256').update(input).digest('hex');
}

let password = 'umma'
const hash1 = hash(password);
console.log(hash1)


let password2 = 'pwd1'
const hash2 = hash(password2);
console.log(hash2)