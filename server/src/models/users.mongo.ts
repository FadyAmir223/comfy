import mongoose from 'mongoose';

// type - required - default - min - max
// type: Number - String - Boolean - Date
// [ Number ]

// target: { // forigne key
//   type: mongoose.OjbectId,
//   ref: 'planet',
// },

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  imgUrl: String,
  accessToken: String,
  refreshToken: String,
});

export default mongoose.model('User', userSchema);
