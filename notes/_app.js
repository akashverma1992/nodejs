console.log('Starting app.');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');
const _ = require('lodash');

var log = (msg) => console.log(msg);

/* var user = os.userInfo({encoding: 'UTF-8'});
console.log(user.gid, user.homedir, user.shell, user.uid, user.username);
console.log(user);

fs.writeFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`, function(err){
  if(err)
    console.log(err);
}); */

/* var result = notes.addNote();
log(result);

result = notes.add(20, 30);
log(result); */

// log(module);

// lodash
var a = '12';
log(_.isString(a));

let arr = [8,1,2,1,3,4,3,5,6,7,9,7,10,11,10]
arr = _.uniq(arr);
arr = _.sortedUniq(arr);
log(arr);
