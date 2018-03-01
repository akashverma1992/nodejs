/* const {SHA256} = require('crypto-js');

var msg = 'I am Aakash';
var hash = SHA256(msg);
// var saltHash = SHA256(msg + (Math.random() * 2));
var salt = 'salt';
var saltHash = SHA256(msg + salt).toString();

var arg = process.argv[2].toString();
var argSalt = SHA256(arg + salt).toString();

console.log(`Msg: ${msg}`);
console.log(`Hash: ${hash}`);
console.log(`Salt-Hash: ${saltHash}`);
console.log(`Arg-Salt-Hash: ${argSalt}`);

console.log(`HashLength: ${hash.toString().length}`);
console.log(`Salt-Hash-Length: ${saltHash.toString().length}`);

if (argSalt ===  saltHash) {
  console.log('Data not changed.')
} else {
  console.log('Data changed.')  
} */

const bcrypt = require("bcrypt");
var password = "123abc!";
var gensalt;
var genhash;

// with promises
bcrypt
  .genSalt(15)
  .then(salt => {
    gensalt = salt;
    console.log(gensalt);
    bcrypt.hash(password, gensalt).then(hash => {
      genhash = hash;
      console.log(genhash);
      bcrypt.compare(password, genhash).then(res => {
        console.log(res);
      });
    });
  })
  .catch(e => {
    console.log(e);
  });

// var hash = "$2a$15$uaY9BttOX97sxakkiGeL3e1tmtJ968FUlYjnZS2X3am9um.pldmT.";

// bcrypt.compare(password, genhash).then((res) => {
//   console.log(res);
// });

/* bcrypt.hash(password, 10).then((hash) => {
  console.log(`Hash: ${hash}`);
}); */
