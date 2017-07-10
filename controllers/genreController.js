var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

// Display list of all Genre
exports.genre_list = function (req, res) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) { return next(err); }
      // successful rendering
      res.render('genre_list', { title: 'Genre List', list_genres:  list_genres});
    });
};

// Display detail page for a specific Genre
exports.genre_detail = function (req, res, next) {
  async.parallel({
    genre: function(callback) {
      Genre.findById(req.params.id)
        .exec(callback);
    },

    genre_books: function(callback) {
      Book.find({ 'genre': req.params.id})
        .exec(callback);
    },
  }, function(err, results) {
    if (err) return next(err);
    // successful rendering
    res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
  });
};

// Display Genre create form on GET
exports.genre_create_get = function (req, res) {
  res.render('genre_form', { title: 'Create Genre'});
};

// Handle Genre create on POST
exports.genre_create_post = function (req, res, next) {
  // check name field is not empty 
  req.checkBody('name', 'Genre name require').notEmpty();

  // trim and escape the name field
  req.sanitize('name').escape();
  req.sanitize('name').trim();

  // Here is the vaildators
  var errors = req.validationErrors();

  // Create a genre object with escaped and  trimmed data 
  var genre = new Genre( 
    { name: req.body.name }
  ); 

  if (errors) {
    res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors});
    return;
  }
  else {
    //Data from form is valid 
    // Check whether genre name already exists 
    Genre.findOne({ 'name': req.body.name })
      .exec( function (err, found_genre) {
        console.log('Found Genre: '+ found_genre);
        if (err) return next(err);
        if (found_genre) {
          //genre exists
          res.redirect(found_genre.url);
        }
        else {
          genre.save(function (err) {
            if (err) return next(err);
            res.redirect(genre.url);
          });
        }
      });
  }
};

// Display Genre delete form on GET
exports.genre_delete_get = function (req, res, next) {

  async.parallel({
    genre: function (callback) {
      Genre.findById(req.params.id).exec(callback)
    },
    genre_books: function (callback) {
      Book.find({ 'genre': req.params.id }).exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err); }
    //Successful, so render
    res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books });
  });

};

// Handle Genre delete on POST
exports.genre_delete_post = function (req, res, next) {

  req.checkBody('id', 'Genre id must exist').notEmpty();

  async.parallel({
    genre: function (callback) {
      Genre.findById(req.params.id).exec(callback)
    },
    genre_books: function (callback) {
      Book.find({ 'genre': req.params.id }).exec(callback)
    },
  }, function (err, results) {
    if (err) { return next(err); }
    //Success
    if (results.genre_books > 0) {
      //Genre has books. Render in same way as for GET route.
      res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books });
      return;
    }
    else {
      //Genre has no books. Delete object and redirect to the list of genres.
      Genre.findByIdAndRemove(req.body.id, function deleteGenre(err) {
        if (err) { return next(err); }
        //Success - got to genres list
        res.redirect('/catalog/genres')
      })

    }
  });

};

// Display Genre update form on GET
exports.genre_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST
exports.genre_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};