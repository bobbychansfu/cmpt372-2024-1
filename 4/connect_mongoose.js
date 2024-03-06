var mongoose = require("mongoose");

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://<your_DB_URL>");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

// Define Schema for a model
var Schema = mongoose.Schema;

var userSchema = new Schema({
     uname: { type: String },
     age: { type: Number, min:[0, 'not born yet'], max: 110 },
     password: {type: String, minlength: 4 }
});

var User = mongoose.model("user", userSchema);  

var creatUser = async() => {
  var Bobby = new User({
    uname: "bobbyc",
    age: 42,
    password: "pp224"
  });
  try {
    await Bobby.save();
    console.log('done')
  } catch(e) {
    console.log(e.errors)
  }
  process.exit()
}

creatUser()


