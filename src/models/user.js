const mongoose = require("mongoose");
const validator = require("validator");
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("../models/task");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is invalid");
				}
			}
		},
		age: {
			type: Number,
			default: 0,
			validate(value) {
				if (value < 0) {
					throw new Error("Age must be a positive number.");
				}
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 7,
			trim: true,
			validate(value) {
				if (validator.contains(value.toLowerCase(), "password")) {
					throw new Error(`The password can't contain the word 'password'`);
				}
			}
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		],
		avatar: {
			type: Buffer
		}
	},
	{
		timestamps: true
	}
);

userSchema.virtual("tasks", {
	ref: "Task",
	localField: "_id",
	foreignField: "owner"
});

userSchema.methods.toJSON = function() {
	const user = this;
	const userObj = user.toObject();

	delete userObj.password;
	delete userObj.tokens;
	delete userObj.avatar;

	return userObj;
};
userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Unable to login");
	}

	const isMatch = await bCrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Unable to login");
	}

	return user;
};

// hash the password
userSchema.pre("save", async function(next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bCrypt.hash(user.password, 8);
	}

	next();
});

// Delete users tasks
userSchema.pre("remove", async function(next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
