import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModel";
import { compare, hash } from "bcryptjs";
import { generateToken } from "../config/generateToken";

export const userRegister = async (req: Request, res: Response) => {
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
      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });
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
      data: {
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

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    
    let user = (await userModel.findOne({ email })) as IUser;
    
    if (!user) {
      return res.status(400).json({
        success: false,
        mgs: "Email not found.  Please Register...",
      });
    }

    const isPasswordValid = await compare(String(password), user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect password",
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      success: true,
      msg: "Login Successful",
      data: token,
    });
  } catch (err) {
    console.error("Login :", err);
    res.status(400).json("Something login error");
  }
};
