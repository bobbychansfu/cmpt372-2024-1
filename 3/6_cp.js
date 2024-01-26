let cp = require('child_process')
let os = require('os')

if (os.platform() == 'darwin') {
    fn = 'bobby'
    age = 42
    cp.exec(`sh sayhi.sh ${fn} ${age}`, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        }
        console.log(stdout)
    })
} else {
    console.log('This only works on Mac OS')
}