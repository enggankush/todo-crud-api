import { Request, Response } from "express";
import userModel from "../models/userModel";
import { hash } from "bcryptjs";

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
    console.error("register :",err);
    res.status(400).json("Something worng");
  }
};
