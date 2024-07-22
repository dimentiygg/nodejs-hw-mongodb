import { model, Schema } from 'mongoose';
import { emailRegexp } from '../../constants/constants.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('save', mongooseSaveError);
userSchema.post('findOneAndUpdate', mongooseSaveError);

const User = model('User', userSchema);

export default User;
