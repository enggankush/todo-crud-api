import { body } from "express-validator";

export const createTodoValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),
    body("userId")
        .notEmpty()
        .withMessage("userId is required"),

];

export const updateTodoValidator = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .notEmpty()
        .withMessage("Description is required"),
    body("userId")
        .notEmpty()
        .withMessage("userId is required"),

];

