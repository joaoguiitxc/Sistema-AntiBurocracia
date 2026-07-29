import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const register = async (data) => {
    const {
        name,
        email,
        password,
        role,
        sector,
        active,
    } = data;

    if (!name || !email || !password || !role || !sector) {
        const error = new Error("Todos os campos obrigatórios devem ser preenchidos.");
        error.statusCode = 400;
        throw error;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error("Esse usuário já existe.");
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        sector,
        active: active ?? true,
    });

    return {
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            sector: user.sector,
            active: user.active,
        },
    };
};

const login = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        const error = new Error("Email e senha são obrigatórios.");
        error.statusCode = 400;
        throw error;
    }

    const userLogin = await User.findOne({ email }).select("+password");

    if (!userLogin) {
        const error = new Error("Email ou senha inválidos.");
        error.statusCode = 401;
        throw error;
    }

    if (!userLogin.active) {
        const error = new Error("Usuário desativado.");
        error.statusCode = 403;
        throw error;
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        userLogin.password
    );

    if (!passwordCorrect) {
        const error = new Error("Email ou senha inválidos.");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: userLogin._id,
            role: userLogin.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        }
    );

    return {
        user: {
            _id: userLogin._id,
            name: userLogin.name,
            email: userLogin.email,
            role: userLogin.role,
            sector: userLogin.sector,
            active: userLogin.active,
        },
        token,
    };
};

export default {
    register,
    login,
};