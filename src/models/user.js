import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserDataSchema = new Schema({
    firstname: {
        type: Schema.Types.String
    },
    lastname: {
        type: Schema.Types.String
    },
    email:  {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String,
    }
},);
UserDataSchema.index({'$**': 'text'});

exports.userModel = mongoose.model('user', UserDataSchema);
