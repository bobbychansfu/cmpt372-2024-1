var users = []

function nextUser() {
    process.stdout.write('Enter name: ')
}

process.stdin.on('data', function(data) {
    users.push(data.toString().trim())
    if (users.length < 3) {
        nextUser()
    } else {
        console.log(users)
        process.exit()
    }
})

process.on('exit', function() {
    users.forEach(function(user) {
        console.log('Goodbye, ' + user + '!')
    })
})

nextUser()