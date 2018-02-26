/* var somePromise = new Promise((resolve, reject) => {
  // async
  setTimeout(() => {
    resolve('Worked!');
    // reject('Unable to fulfill request.');
  }, 5000);

  // sync
  // resolve('Worked!');
});

somePromise.then(
  // success callback
  (msg) => {
  console.log(`Success: ${msg}`);
}, 
// error callback
(errMsg) => {
  console.log(`Error: ${errMsg}`);
}); */

// async add function
var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      } else {
        reject('Arguments must be numbers.')
      }
    }, 2500);
  });
};

// console.log(asyncAdd(5,7));

asyncAdd(5,7).then((successMsg) => {
  console.log(successMsg);
}, (errorMsg) => {
  console.log(errorMsg);
});