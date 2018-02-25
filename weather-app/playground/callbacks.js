var getUser = (id, callback) => {
 var userObj = {
   id: id,
   name: 'Aakash'
 };
 // sync model
 // callback(userObj);

 // async model
 setTimeout(() => {
   callback(userObj);
 }, 3000);

};

getUser(16, (user) => {
  console.log(user);
});
