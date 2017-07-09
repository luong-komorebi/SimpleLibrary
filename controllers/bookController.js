var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');


exports.index = function (req, res) {
  async.parallel({
    book_count: function (callback) {
      Book.count(callback);
    },
    book_instance_count: function (callback) {
      BookInstance.count(callback);
    },
    book_instance_available_count: function (callback) {
      BookInstance.count({ status: 'available'}, callback);
    },
    author_count: function (callback) {
      Author.count(callback);
    },
    genre_count: function (callback) {
      Genre.count(callback);
    },
  }, function (err, results) {
    res.render('index', { title: 'Local Library Home', error: err, data: results })
  });
};

// Display list of all books
exports.book_list = function (req, res, next) {
  Book.find({}, 'title author ')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) return next(err);
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });
};

// Display detail page for a specific book
exports.book_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET
exports.book_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST
exports.book_create_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET
exports.book_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST
exports.book_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET
exports.book_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST
exports.book_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Book update POST');
};
