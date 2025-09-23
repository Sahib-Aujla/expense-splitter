import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    scaAddress: { type: String, default: null },
});
const User = models.User || model('User', userSchema);
export default User;