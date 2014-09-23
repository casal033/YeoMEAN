'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CourseSchema = new Schema({
  title: String,
  grade: String,
  credit: Number
});

module.exports = mongoose.model('Course', CourseSchema);