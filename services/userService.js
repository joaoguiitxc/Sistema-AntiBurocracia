import bcrypt from "bcryptjs";
import User from "../models/user.js";

const createUser = async (data) => {

    const {
        name,
        email,
        password,
        role,
        sector
    } = data;


    if (!name || !email || !password || !role || !sector) {

        const error = new Error(
            "Todos os campos devem ser preenchidos"
        );

        error.statusCode = 400;
        throw error;
    }


    const userExists = await User.findOne({
        email
    });


    if (userExists) {

        const error = new Error(
            "Esse usuário já existe"
        );

        error.statusCode = 400;
        throw error;
    }


    const hashedPassword = await bcrypt.hash(
        password,
        10
    );


    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        sector,
        active: true
    });


    return user;
};

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
    createUser
};
