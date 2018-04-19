var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sname: { type: String, require: true },
    hash: { type: String, require: true },
    salt: { type: String, require: true },
    sid: { type: String, unique: true, require: true },
    sex: { type: Number, default: 0 },
    card: { type: String, require: true },
    img: { type: String, require: true },
    major: { type: String, default: '' },
    identity: { type: String, default: '' },
    department: { type: String, default: '' },
    uid: { type: String, unique: true, require: false },
    lasttime: { type: Date },
    token: { type: String, default: '' },
    level: { type: Number, default: 0 },
    regno: { type: Number },
    regtime: { type: Date, default: Date.now },
    update: { type: Number, default: 0 },
    approve: { type: Number, default: 0 }
});

mongoose.Promise = global.Promise;
mongoose.model('User', userSchema);