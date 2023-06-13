const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const Joi = require("joi");

const subscribersList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscribersList,
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", mongooseError);

const signInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subscribersList),
});

const updateSubscribeSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscribersList)
    .required(),
}).unknown();

const User = model("user", userSchema);

module.exports = {
  User,
  signInSchema,
  updateSubscribeSchema,
};
