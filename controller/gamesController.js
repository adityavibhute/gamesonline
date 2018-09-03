var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://adityav:adi123@ds137812.mlab.com:37812/games', function (err, db) {
	if(err) return err;
	else
	console.log("I am connect to DB!!! ");
});

var callback = function(err, data){
	if(err){
		return err;
	} else{
		console.log("Added data!!! ", data);
	}
}

var userSchema = new Schema({
	userid: {type: String, index:true, unique:true, trim:true, required: true},
	password : {type: String, default: "11111111"},
	balancechips : {type: Number, default: 0.0},
	state: {type: Number, default: 2},
	emailId: {type: String, required: true},
	userType: {type: String}
});

var userModel = mongoose.model('users',userSchema,'users');

var john = new userModel({
	userid: 'Seeds',
	password : 'QWERTY123',
	balancechips : 11,
	state: 2,
	emailId: "sudsndeep@gmail.com",
	userType: "HIGH"
});
john.save(callback);

var addrSchema = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'userModel', required:true},
	addressType : {type: String, default: "Residence"},
	pincode: {type: Number},
	country: {type: String},
	state: {type: String},
	city: {type: String}
});

var addrModel = mongoose.model('address', addrSchema, 'address');

var johnAddr = new addrModel({
	userid: john._id,
	addressType : "Mahar",
	pincode: 411048,
	country: "India",
	state: "Maha",
	city: "Pune"
});
johnAddr.save(callback);

var games = new Schema({
	gameID: {type: String, required: true, unique: true},
	gamename: {type: String, trim: true},
	state: {type: Number, default: 0},
	minbet: {type: Number, default: 1.0},
	maxbet: {type: Number, default: 1000.0}
});

var gamesModel = mongoose.model('games', games, 'games');

var johnGame = new gamesModel({
	gameID: "Lenaood",
	gamename: "Cuba Libra",
	state: 2,
	minbet: 3,
	maxbet: 10
});
johnGame.save(callback);

var loginSchema = new Schema({
	userid: {type: Schema.Types.ObjectId, ref: 'userModel'},
	sessionId: {type: String, required: true, index: true},
	startworth: {type: Number, default: 0.0},
	endworth: {type: Number, default: 0},
	logintime: {type:Date, default: new Date()},
    logouttime: {type:Date, default: new Date()},
	totalbet: {type: Number, default: 0.0},
	totalwin: {type: Number, default: 0.0}
});

var loginModel = mongoose.model('loginsession', loginSchema,'loginsession');

var johnLogin = new loginModel({
 	userid: john._id,
	sessionId: "ses_01",
	startworth: 12,
	logintime: new Date().toString(),
    logouttime: new Date().toString(),
	endworth: 132,
	totalbet: 2,
	totalwin: 2
});

johnLogin.save(callback);

var gamePlayOff = new Schema({
	loginId : {type: String, index:true, unique:true, trim:true, required: true},
	userid: {type: Schema.Types.ObjectId, ref: 'userModel', required: true},
	betamount: {type: Number, default:0},
	winamount: {type: Number, default:0},
	playDetails: {type: String},
	sessionId: {type: Schema.Types.ObjectId, ref: 'loginModel'},
	gameID: {type: Schema.Types.ObjectId, ref: 'gamesModel'},
	playtime: {type:Date, default: new Date()},
});

var gameLogs = mongoose.model('gamelog', gamePlayOff, 'gamelog');

var johnLog = new gameLogs({
	loginId : "Dpt",
	userid: john._id,
	betamount: 3,
	winamount: 20,
	playDetails: "nai idea",
	sessionId: johnLogin._id,
	gameID: johnGame._id
});
johnLog.save(callback);

module.exports = function(app){
	console.log("I am in app ", app);
}