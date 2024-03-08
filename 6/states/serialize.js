const v8 = require('v8')

serialized_data = v8.serialize({'name':'bobby'})
console.log(serialized_data + '\n')

console.log(v8.deserialize(serialized_data))