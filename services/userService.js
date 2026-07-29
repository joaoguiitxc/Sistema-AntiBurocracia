import bcrypt from "bcryptjs";
import User from "../models/user.js";


const getAllUser = async () => {
    return await User.find();
};


const getUserById = async (id) => {

    const user = await User.findById(id);

    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
};


const updateUser = async (id, data) => {

    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }


    const user = await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true,
        }
    );


    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }


    return user;
};


const deactivateUser = async (id) => {

    const user = await User.findById(id);


    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }


    user.active = false;

    await user.save();


    return user;
};


const activateUser = async (id) => {

    const user = await User.findById(id);


    if (!user) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }


    user.active = true;

    await user.save();


    return user;
};


export default {
    getAllUser,
    getUserById,
    updateUser,
    deactivateUser,
    activateUser,
};
