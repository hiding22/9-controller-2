var db = require('../db');
const shortid = require('shortid');

module.exports.index = (req, res) => {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = (req, res)=> {
	var q = req.query.q;
	var matched = db.get('users').value().filter(function (user) {
    	return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
	});

	res.render('users/index', {
    users: matched
  });
};

module.exports.create = (req, res) => {
	res.render('users/create');
};

module.exports.delete = (req, res) => {
	var id = req.params.id;

	var book = db.get('users').find({ id: id }).value();

	db.get('users')
	.remove({ id: book.id })
	.write();
	res.redirect('/users');
};

module.exports.view = (req, res) => {
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	})
};

module.exports.update = (req, res) => { 
	res.render('users/update', {
		id: req.params.id
	});
};

module.exports.postUpdate = (req, res) => {
	db.get('users')
	.find({ id: req.params.id })
	.assign({ name: req.body.name })
	.write();
	res.redirect("/users")
};

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
};