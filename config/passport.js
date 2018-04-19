const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'sid' 
},function(username, password, done) {
    User.findOne({ sid: username }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: '用户不存在' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: '密码错误!' });
        }
        return done(null, user);
    });
    }
));