import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    avatar: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: null
    },
    phone: {
      type: String,
      minlength: 11,
      maxlength: 11,
      default: null
    },
    user_type: {
      type: String,
      enum: ['admin', 'student'],
      default: 'student',
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toObject: { virtuals: true }
  }
);

/**
 * pre-save hooks
 */
UserSchema.pre('save', () => {});

/**
 * Methods
 */
UserSchema.methods = {
  toJSON() {
    const { password, _id: id, __v, ...rest } = this.toObject();
    return { ...rest, id };
  }
};

/**
 * Statics
 */
UserSchema.statics = {};

export default model('user', UserSchema);
