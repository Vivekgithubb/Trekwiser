import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { string } from "mathjs";

//model structure
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    coverImg: { type: String },

    savedTreks: [{ type: Schema.Types.ObjectId, ref: "Trek" }], // Only bookmarking feature

    phonenumber: String,
    city: String,
    description: {
      type: String,
      minlength: 10,
      maxlength: 50,
    },
    badges: {
      type: String,
      enum: ["Clean God", "Master At Cleanliness", "Legend at work"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    passwordConf: {
      type: string,
      required: [true, "Needs to have a password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords need to match",
      },
    },
    passwordChangedAt: Date,
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// ✅ Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    if (!this.password.startsWith("$2")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    next(err);
  }
});

//Encryption between getting the data and saving the data
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if the field is not been modified skip and call next midleware

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConf = undefined; //deleting the confirmed password
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// ✅ Methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
