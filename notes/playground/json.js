/* var obj = {
  name: 'aakash'
};

var stringObj = JSON.stringify(obj);

console.log(typeof obj);
console.log(typeof stringObj);
console.log(stringObj);

var personString = `{"name":"aakash", "age":"25"}`;
console.log(personString);

var personObj = JSON.parse(personString);
console.log(personObj);
console.log(personObj.name, personObj.age); */

const fs = require('fs');
const yargv = require('yargs');
// console.log(yargv.argv);

var originalNote = {
  title: yargv.argv.title,
  body: yargv.argv.body
};

var originalNoteString = JSON.stringify(originalNote);
console.log(`JSON String: ${originalNoteString}`);

// write {note} to a file
fs.writeFileSync('notes.json', originalNoteString);

// read notes.json contents
var noteString = fs.readFileSync('notes.json');

// note obj
var note = JSON.parse(noteString);
console.log(`JSObject: `, note);
