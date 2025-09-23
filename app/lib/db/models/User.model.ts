import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    scaAddress: { type: String, default: null },
});
const User = models.User || model('User', userSchema);
export default User;