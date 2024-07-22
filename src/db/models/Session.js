import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessTokenValidUntil: {
    type: Date,
    required: true,
  },
  refreshTokenValidUntil: {
    type: Date,
    required: true,
  },
});

sessionSchema.pre('findOneAndUpdate', setUpdateSettings);
sessionSchema.post('save', mongooseSaveError);
sessionSchema.post('findOneAndUpdate', mongooseSaveError);

const Session = model('Session', sessionSchema);

export default Session;
