const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../database");
//passport.use('local', new LocalStrategy({

//}, () => {})
//);

passport.use(new LocalStrategy(function(username, password, done) {
  db.ref("super_users").orderByKey().equalTo(username).on('value', (snapshot) => {
    console.log(snapshot.exists());
    if(!snapshot.exists()) {
      console.log("Not found user: " + username);
      return done(null, false);
    }
    snapshot.forEach((user) => {
      console.log("User " + username + " found");
      if (password === user.val().password) {
        //console.log(user);
        return done (null, {id: 1, name: username});
      }
    });
  });
}));

// Serializacion
passport.serializeUser(function(user, done){
   done(null, user.id);
});

// Deserializacion
passport.deserializeUser(function(id, done) {
  done(null, { id: 1, name: "Cody" });
});

exports.isAuthenticated = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login"); 
}
