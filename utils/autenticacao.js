
var crypto 		= require('crypto');
var moment 		= require('moment');
var Usuario = require('../models/Usuario.js');

/* login validation methods */
exports.autenticar = function(req, res, render)
{
		// check if the user's credentials are saved in a cookie //
		if (req.cookies.user != undefined && req.cookies.pass != undefined){
			autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				  req.session.user = o;
					res.render(render);
				}	else{
					 res.render('login');
				}
			});
		}
		else if(req.session.user != undefined && req.session.user.login != undefined && req.session.user.pass != undefined){
			autoLogin(req.session.user.login, req.session.user.pass, function(o){
					if (o != null){
					  req.session.user = o;
						res.render(render);
					}	else{
						 res.render('login');
					}
			});
		}
		else {
				res.render('login');
		}
}

var autoLogin = function(login, pass, callback)
{
		Usuario.findOne({login:login}, function(e, o) {
			if (o){
				o.pass == pass ? callback(o) : callback(null);
			}	else{
				callback(null);
			}
		});
}

exports.manualLogin = function(login, pass, callback)
{
	Usuario.findOne({login:login}, function(e, o) {
		if (o == null){
			console.log(login);
			callback('user-not-found');
		}	else{

			validatePassword(pass, o.pass, function(err, res) {
				if (res){

					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	Usuario.findOne({login:newData.login}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			Usuario.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						// newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						Usuario.create(newData, function (err, post) {
			        if (err) return next(err);
							post.pass = hash;
			        callback(null,post);
			      });
					});
				}
			});
		}
	});
}

exports.updateAccount = function(newData, callback)
{
	Usuario.findOne({_id:getObjectId(newData.id)}, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			Usuario.save(o, {safe: true}, function(e) {
				if (e) callback(e);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				Usuario.save(o, {safe: true}, function(e) {
					if (e) callback(e);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function(email, newPass, callback)
{
	Usuario.findOne({email:email}, function(e, o){
		if (e){
			callback(e, null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.pass = hash;
		        Usuario.save(o, {safe: true}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	Usuario.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	Usuario.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	Usuario.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	Usuario.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

exports.delAllRecords = function(callback)
{
	Usuario.remove({}, callback); // reset Usuario collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
	Usuario.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	Usuario.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
