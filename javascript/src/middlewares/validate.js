import { validationResult } from "express-validator";

export const validate = (validators) => {
  return async (req, res, next) => {
    // Run all validators
    for (let validator of validators) {
      console.log("validate = ", validator);
      await validator.run(req);
    }

    // Collect validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }

    next();
  };
};
