var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var AuthorSchema = Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

AuthorSchema
.virtual('url')
.get(function() {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('dob_formatted')
.get(function() {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : 'No info';
});

AuthorSchema
.virtual('dod_formatted')
.get(function() {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : 'No info';
});

AuthorSchema
  .virtual('date_of_birth_yyyy_mm_dd')
  .get(function () {
    return moment(this.date_of_birth).format('YYYY-MM-DD');
  });

AuthorSchema
  .virtual('date_of_death_yyyy_mm_dd')
  .get(function () {
    return moment(this.date_of_death).format('YYYY-MM-DD');
  });

module.exports = mongoose.model('Author', AuthorSchema);