console.log(`Starting app.`);

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const cmdLine = require('./cmdLine');

var log = (msg) => console.log(msg);
var yargv = yargs.argv;

/* log('Command: ', process.argv[2]);
log(process.argv);
log(yargv); */

// cmdLine.printCmdLine(process.argv[2]);
// const cmd = process.argv[2];
const cmd = yargv._[0];

if (cmd === 'add') {
  // cmdLine.printCmdLine(cmd);
  log(notes.addNote(yargv.title, yargv.body));
} else if (cmd === 'list') {
  // cmdLine.printCmdLine(cmd);
  log(notes.getAll());
} else if (cmd === 'write') {
  // cmdLine.printCmdLine(cmd);
  log(notes.write(yargv.title));
} else if (cmd === 'read') {
  // cmdLine.printCmdLine(cmd);
  log(notes.read(yargv.title));
} else if (cmd === 'remove') {
  // cmdLine.printCmdLine(cmd);
  log(notes.remove(yargv.title));
} else {
  log('Command not recognized');
}
 