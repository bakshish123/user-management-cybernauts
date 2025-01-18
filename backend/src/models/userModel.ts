import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  age: number;
  hobbies: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: [String], required: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
