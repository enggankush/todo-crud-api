import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is Required"),

  body("dob")
    .notEmpty()
    .withMessage("Date of Birth is Required")
    .bail()
    .matches(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[0-2])[/](19|20)\d\d$/)
    .withMessage("Invalid Date of Birth (format: dd/mm/yyyy)"),

  body("mobile")
    .notEmpty()
    .withMessage("Mobile number is required")
    .bail()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mobile number"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be at least 6 & 10 characters"),

  body("confirm_password")
    .notEmpty()
    .withMessage("Confirm_password is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is Required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),
];

export const updatedValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name is Required"),
  body("dob")
    .optional()
    .matches(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](19|20)\d\d$/)
    .withMessage("Invalid Date of Birth (format: dd/mm/yyyy)"),

  body("mobile")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid mobile number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),
];
