import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
    try {
        const { title, description, userId } = req.body;
        // check validator before include code

        const todo = new Todo({
            title,
            description,
            userId,
        });

        await todo.save();
        res.status(201).json(todo);

    } catch (error) {
        res.status(500).json({
            msg: "Something went worng",
        });
    }
};

export const todoUpdate = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { title, description } = req.body;

        const updateTodo = {};
        if (title) updateTodo.title = title;
        if (description) updateTodo.description = description;

        const updateUserTodo = await Todo.findByIdAndUpdate(
            todoId,
            { $set: updateTodo },
            { new: true }
        );
        if (!updateUserTodo) {
            return res.status(404).json({
                success: false,
                msg: "No todo found with this id",
            });
        }

        res.status(200).json({
            success: true,
            msg: "Todo updated successfully",
            user: {
                title,
                description
            },
        });
    } catch (error) {
        res.status(500).json("Todo not update, something worng")
    }
};

export const todoDelete = async (req, res) => {
    try {
        const todoId = req.params.id;

        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(400).json({
                success: false,
                msg: "Todo not found",
            });
        }
        res.status(200).json({
            success: true,
            msg: " Todo Id Delete successfuly",
        });

    } catch (error) {
        res.status(500).json("Todo not delete, something worng")
    }
}