const { scryptSync, timingSafeEqual, randomBytes } = require('crypto');

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');  

    const user = { email, password: `${salt}:${hashedPassword}` }
  
    users.push(user);

    return user
}


function login(email, password) {
    const user = users.find(element => {return element.email === email});
  
    const [salt, keyString] = user.password.split(':'); 
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  
    const match = timingSafeEqual(hashedPassword, keyString); 
    
    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}
