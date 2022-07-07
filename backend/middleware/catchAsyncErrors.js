//just like try catch block 
//promise is inbuilt javascript class
module.exports = (thefunc) => (req, res, next) => {
  Promise.resolve(thefunc(req, res, next))
  .catch(next);
};
