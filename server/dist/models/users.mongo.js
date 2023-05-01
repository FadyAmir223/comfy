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
    accessToken: String,
    refreshToken: String,
});
export default mongoose.model('User', userSchema);
