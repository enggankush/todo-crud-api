import { NextFunction, Request, RequestHandler, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = (validators: ValidationChain[]): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Run all validators
    for (let validator of validators) {
      await validator.run(req);
    }
    // Collect validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: "path" in err ? err.path : "unknown",
          message: err.msg,
        })),
      });
      return;
    }

    next();
  };
};
