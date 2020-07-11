var db = require('../db');
const shortid = require('shortid');

module.exports.index = (request, response) => {
	response.render('books/index', {
		books: db.get('books').value()
	});
};

module.exports.search = (req, res)=> {
	var q = req.query.q;
	var matched = db.get('books').value().filter(function (book) {
    	return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
	});

	res.render('books/index', {
    books: matched
  });
};

module.exports.create = (req, res) => {
	res.render('books/create');
};

module.exports.delete = (req, res) => {
	var id = req.params.id;

	var book = db.get('books').find({ id: id }).value();

	db.get('books')
	.remove({ id: book.id })
	.write();
	res.redirect('/books');
};

module.exports.view = (req, res) => {
	var id = req.params.id;

	var book = db.get('books').find({ id: id }).value();
	res.render('books/view', {
		book: book
	})
};

module.exports.update = (req, res) => { 
	res.render('books/update', {
		id: req.params.id
	});
};

module.exports.postUpdate = (req, res) => {
	db.get('books')
	.find({ id: req.params.id })
	.assign({ title: req.body.title })
	.write();
	res.redirect("/books")
};

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	db.get('books').push(req.body).write();
	res.redirect('/books');
};
