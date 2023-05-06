import mongoose from 'mongoose';
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
    provider: String,
    accessToken: String,
    refreshToken: String,
    expireDate: Number,
});
export default mongoose.model('User', userSchema);
