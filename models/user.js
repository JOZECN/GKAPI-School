var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    sname: { type: String, require: true },
    hash: { type: String, require: true },
    salt: { type: String, require: true },
    sid: { type: String, unique: true, require: true },
    sex: { type: Number, enum: [0, 1], default: 0 },
    card: { type: String, require: true },
    img: { type: String, require: true },
    major: { type: String, default: '' },
    identity: { type: String, default: '' },
    department: { type: String, default: '' },
    fingerprint: { type: String, default: '' },
    uid: { type: String },
    lasttime: { type: Date, default: Date.now },
    token: { type: String, default: '' },
    level: { type: Number, enum: [0, 1, 2, 3],default: 0 },
    regno: { type: Number, required: true },
    regtime: { type: Date, default: Date.now },
    update: { type: Number, enum: [0, 1], default: 0 },
    approve: { type: Number, enum: [0, 1], default: 0 }
});

mongoose.Promise = global.Promise;
module.exports = mongoose.model('User', userSchema);