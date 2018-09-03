var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var multer = require('multer');
var mongo = require('mongodb');
// var upload = multer({ dest: './uploads' });
var todoController = require('./controller/todoController');
var employeeController = require('./controller/empController');
var gameController = require('./controller/gamesController');
app.set('views', path.join(__dirname, '/view'));
app.set('view engine' , 'ejs');
app.engine('html', require('ejs').renderFile);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set storage to upload file
var storage = multer.diskStorage({
	destination : __dirname + '/uploads/',
	filename : function(req, file, cb){
		console.log(file);
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
})

// Init upload
var upload = multer({
	storage : storage,
	limits : {
		fileSize : 1000000
	},
	fileFilter : function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('fileUp');

// Check File type
function checkFileType(file, cb){
	// allowed types
	var fileTypes = /jpeg|jpg|png|gif|pdf/;
	// chk ext
	var extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	// check mime type
	var mimeType = fileTypes.test(file.mimeType); 

	if(mimeType && extname){
		return cb(null, true);
	} else {
		cb('Error in file Type');
	}
}

app.get('/',function(req, res) {
	res.render('home');
})

app.get('/contact', function(req, res) {
	console.log(req.query);
	console.log("Parameters are ", req.params);
	res.render('custom');
})

app.get('/employee', function(req, res){
	res.sendFile('contactEmployee.html', {root : './view'});
})

// app.get('/empData', function(req, res){
// 	// console.log("I am req ", req.params);
// 	console.log("I am response ", res);
// });

app.use('/utils' , express.static(__dirname + '/utils'));

app.post('/contact', urlencodedParser,function(req, res) {
	console.log("Req body post contact", req.body);
	res.render('contact-success', {data : req.body});
})

app.post('/file_upload', function(req, res){
	upload(req, res, function(err){
		if(err){
			console.log("error in file upload");
		}else{
			res.json(req.file);
		}
	})
});

// Call todo Controller
employeeController(app);
todoController(app);
gameController(app);
app.listen(8080);