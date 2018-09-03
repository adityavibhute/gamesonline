// Same 
// var MongoClient = require('mongodb').MongoClient;
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
// var url = "mongodb://localhost:27017/";
// var dbo;
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   dbo = db.db("employee");
// });
// module.exports = function(app){
//      app.post('/employeeData', urlencodedParser, function(req, res){
//          res.send({data : "Hello successs"});
//          var obj = {
//              name : req.body.name,
//              lname : req.body.lname,
//              age : req.body.age
//          };
//          dbo.collection("empData").insertOne(obj, function(err, res) {
//             if (err) throw err;
//             console.log("1 document inserted ");
//          });
//      });
// }

var moongose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });   
// Connect to the database
moongose.connect('mongodb://adiv:test@ds241668.mlab.com:41668/todonode');

             // Define db Schema
 var dbSchema = new moongose.Schema({
     name : { type: String, required : true, max : 10 },
     lname : { type: String, required : true, max : 10 },
     age : { type: Number, required : false, max : 3 }
 });

 // NEXT :- https://codeforgeek.com/2014/09/handle-get-post-request-express-4/

 var emo = moongose.model('empData', dbSchema, 'empData');

 module.exports = function(app){
     app.post('/employeeData', urlencodedParser, function(req, res){
         res.send({data : "Hello successs"});
         console.log("I am req ", req.body);
         var obj = new emo({
             name : req.body.name,
             lname : req.body.lname,
             age : req.body.age
         });
         obj.save(function(err, doc){
             if(err) res.json(err)
             else
                 console.log("successs!!! ", doc);
         })
     });
}