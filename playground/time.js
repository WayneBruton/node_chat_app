// Jan 1st 1970 00:00:00 am
//milliseconds - thus 1000 represents 1 second

// var date = new Date();

// console.log(date.getMonth());//returns zero based month.. IE Jan is 0, Dec is 11

const moment = require('moment');

// var date = moment();
// date.add(100, 'year').subtract(3, 'months');

// console.log(date);
// console.log(date.format('MMM Do YYYY'));

// 10:35 am

var date = moment();
console.log(date.format('h:mm a'));



