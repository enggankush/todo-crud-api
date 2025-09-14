import { Request, Response } from "express";
import userModel from "../models/userModel";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.id;

    const user = await userModel.findById(userId).select("-password").lean();
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }
    const { password, __v, ...rest } = user;
    res.status(200).json({
      success: true,
      data: rest,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json("Something went worng");
  }
};

export const userUpdate = async (req: Request, res: Response) => {
  try {
    type reqType = {
      name: string | null;
      dob: string | null;
      mobile: number | null;
    };

    const userId = res.locals.id;
    const payload = req.body as reqType;

    const updateData: reqType = {
      name: payload?.name ?? null,
      dob: payload?.dob ?? null,
      mobile: payload?.mobile ?? null,
    };

    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        msg: "No record found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "User updated successfully",
      data: updateData,
    });
  } catch (err) {
    console.error("Update :", err);
    res.status(500).json("Something went worng");
  }
};

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.id;
    const deleteUser = await userModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(400).json({
        success: false,
        msg: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      msg: "User Id Delete successfuly",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "Error is delete user api",
    });
  }
};
