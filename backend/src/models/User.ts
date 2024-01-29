import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../entities/user';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true, trim: true },
    token: { type: String },
    isConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
  // eslint-disable-next-line no-return-await
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<User>('User', userSchema);
