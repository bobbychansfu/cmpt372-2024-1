
const uri = "mongodb+srv://<your_DB_URL>";

let MongoClient = require('mongodb').MongoClient;

(async () => {
    // connecting to the database cmpt372, in the a collection called 'documents'
    let client = await MongoClient.connect(uri);
    let db = client.db('cmpt372');
    const docs = db.collection("documents");
    
    // updates one document with a:1 to have n:steve.  
    const res = await docs.updateOne({  "a": 1 }, { $set: {"n":"steve"} }, { upsert: true }); 
    // upsert: true means if the document does not exist, create it

    // search for all documents
    const cursor = docs.find();
    for await (const doc of cursor) {
      console.log(doc);
    }
    
    client.close();
    process.exit(0)
})()
    .catch(err => console.error(err));


