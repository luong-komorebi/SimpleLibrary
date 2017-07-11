var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookInstanceSchema = Schema ({
  book: { type: Schema.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: { type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance' },
  due_back: { type: Date, default: Date.now },
});

BookInstanceSchema
.virtual('url')
.get(function() {
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function () {
  return moment(this.due_back).format('MMMM Do, YYYY');
});

BookInstanceSchema
  .virtual('due_back_yyyy_mm_dd')
  .get(function () {
    return moment(this.due_back).format('YYYY-MM-DD');
  });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);



