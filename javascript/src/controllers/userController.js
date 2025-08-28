import { hash, compare } from "bcryptjs";
import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../middlewares/sendEmail.js";

export const userRegister = async (req, res) => {
  try {
    const { name, dob, mobile, email, password, confirm_password } = req.body;

    //check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        msg: "User already exists",
      });
    }

    //convert with hashed password
    const hashedpassword = await hash(password, 10);

    const newUser = new User({
      name,
      dob,
      mobile,
      email,
      password: hashedpassword,
    });

    await newUser.save();

    //create JWT token
    const token = generateToken(newUser);

    res.status(200).json({
      success: true,
      msg: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name,
        dob,
        mobile,
        email,
        password,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json("Something Wrong");
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        mgs: "Email not found.  Please Register...",
      });
    }

    //Compare password with hashed password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect password",
      });
    }

    //Generate JWT Token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token,
      user: {
        ...user._doc,
        // id: user._id,
        // name: user.name,
        // dob: user.dob,
        // mobile: user.mobile,
        // email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("Something login error");
  }
};

export const userUpdate = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, dob, mobile } = req.body;

    // Create an object with only provided fields
    const updateData = {};
    if (name) updateData.name = name;
    if (dob) updateData.dob = dob;
    if (mobile) updateData.mobile = mobile;

    // Update user by ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        msg: "No record found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "User updated successfully",
      user: {
        name,
        dob,
        mobile,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "Something went worng",
    });
  }
};

export const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      msg: " User Id Delete successfuly",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error is delete user api",
      error,
    });
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        msg: "Email not found"
      });
    }
    if (existingUser.verified) {
      return res.status(400).json({
        success: true,
        msg: "User already verified exists",
      });
    }

    // generate new random password
    const newPassword = Math.random().toString(36).slice(-8); // random 8-char string
    const hashedPassword = await hash(newPassword, 10);

    // update user with new password
    existingUser.password = hashedPassword;
    await existingUser.save();

    // send email with new password
    await sendEmail(
      console.log("new user",existingUser),
      email,
      "Password Reset - UG-PG Study",
      `Hello ${existingUser.name},\n\nYour new password is: ${newPassword}\n\nPlease login and change it immediately.`
    );

    res.status(200).json({
      success: true,
      msg: "New password sent to your email",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Reset password failed" });
  }
};
