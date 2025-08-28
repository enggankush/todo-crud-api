import { body } from "express-validator";

// Validation rules for user registration
export const registerValidator = [
    //All field checked
    // body(["name", "dob", "mobile", "email", "password", "confirm_password"])
    //     .custom((value, { req }) => {
    //         const fields = [!req.body.name ||
    //             !req.body.dob ||
    //             !req.body.mobile ||
    //             !req.body.email ||
    //             !req.body.password ||
    //             !req.body.confirm_password];
    //         const allFilled = fields.every(field => req.body[field] && req.body[field].trim() !== "")
    //         if (!allFilled) {
    //             throw new Error("All fields are required");
    //         }
    //         return true;
    //     }),
    
    // Name
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    // DOB (Required + Regex Format dd/mm/yyyy)
    body("dob")
        .notEmpty()
        .withMessage("Date of birth is required")
        .bail()
        .matches(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](19|20)\d\d$/)
        .withMessage("Invalid Date of Birth (format: dd/mm/yyyy)"),

    // Mobile (Required + 10 digits)
    body("mobile")
        .notEmpty()
        .withMessage("Mobile number is required")
        .bail()
        .isMobilePhone("en-IN")
        .withMessage("Invalid mobile number"),

    // Email (Required + Valid Email)
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email"),

    // Password (Required + Min length 6)
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6, max: 10 })
        .withMessage("Password must be at least 6 & 10 characters"),

    // confirm_password (Required + match password)
    body("confirm_password")
        .notEmpty()
        .withMessage("Confirm_password is required")
        .bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match"),
];

// Validation rules for user login
export const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];

// Validation rules for user Update
export const updateValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Name cannot be empty"),

    body("dob")
        .optional()
        .matches(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](19|20)\d\d$/)
        .withMessage("Invalid Date of Birth (format: dd/mm/yyyy)"),

    body("mobile")
        .optional()
        .isMobilePhone("en-IN")
        .withMessage("Invalid mobile number")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile number must be 10 digits")
]
