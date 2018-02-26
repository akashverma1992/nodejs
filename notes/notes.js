console.log('Starting notes.js.');

/* module.exports.age = 25; */

/* module.exports.addNote = () => {
  console.log('addNote');
  return 'New Note';
}

module.exports.add = (x, y) => {
  console.log('add')
  return (x + y);
} */

// console.log(module);

var addNote = (title, body) => {
  return (`Adding note: Title: ${title}, Body: ${body}`);
};

var getAll = () => {
  return ('Getting all notes');
};

var write = (title) => {
  return (`write into note ${title}`);
};

var read = (title) => {
  return (`read note ${title}`);
}

var remove = (title) => {
  return (`removing note ${title}`);
}

module.exports = {
  addNote,
  getAll,
  write,
  read,
  remove
};