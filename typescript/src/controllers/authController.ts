import { Request, Response } from "express";
import userModel from "../models/userModel";
import { compare, hash } from "bcryptjs";

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      dob,
      mobile,
      email,
      password,
      confirm_password,
    }: {
      name: string;
      dob: string;
      mobile: number;
      email: string;
      password: string;
      confirm_password: string;
    } = req.body;

    //check if user exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        msg: "User already exists",
      });
      return;
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new userModel({
      name,
      dob,
      mobile,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      msg: "User registered",
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
    console.error("Register :", err);
    res.status(400).json("Something worng");
  }
};

export const userLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        mgs: "Email not found.  Please Register...",
      });
      return;
    }

    const isPasswordValid = await compare(String(password), user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        msg: "Incorrect password",
      });
      return;
    }
    res.status(200).json({
      success: true,
      msg: "Login Successful",
      user: {
        id: user._id,
        name: user.name,
        dob: user.dob,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login :", err);
    res.status(400).json("Something login error");
  }
};

export const userUpdate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const {
      name,
      dob,
      mobile,
    }: {
      name: string;
      dob: string;
      mobile: number;
    } = req.body;

    const updateData: { name?: string; dob?: string; mobile?: number } = {};
    if (name) updateData.name = name;
    if (dob) updateData.dob = dob;
    if (mobile) updateData.mobile = mobile;

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updateUser) {
      res.status(404).json({
        success: false,
        msg: "No record found",
      });
    }

    res.status(200).json({
      sucess: true,
      msg: "User updated successfully",
      user: {
        name,
        dob,
        mobile,
      },
    });
  } catch (err) {
    console.error("Update :", err);
    res.status(500).json("Something went worng");
  }
};
