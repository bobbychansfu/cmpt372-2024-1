let path = require('path')
let fs = require('fs')

let fileName = process.argv[2]
let filePath = path.join(__dirname, fileName)

let contents = fs.readFileSync(filePath, 'utf8')

console.log(contents)