import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const register = async (data) => {
    const { name, email, cpf, password, role, sector, active } = data;
    if (!name || !email || !cpf || !password || !role || !sector || !active) {
        const error = new Error("todos os campos devem ser preenchidos corretamente")

        error.statusCode = 400;
        throw error;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Esse usuário já existe");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        cpf,
        password: hashedPassword,
        role: "admin" || "EE",
        sector,
        active: true,
    })

    return {
        user: {
            _id: User._id,
            name: User.name,
            email: User.email,
            cpf: User.cpf,
            role: User.role,
            sector: User.sector,
            active: User.active
        }
    }
};

const login = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        const error = new Error("Email e senha são obrigatórios");
        error.statusCode = 400;
        throw error;
    }
    const userLogin = await User.findOne({ email }).select("+password");
    if (!userLogin) {
        const error = new Error("Email ou senha incorretos");
        error.statusCode = 400;
        throw error;
    }
    if (!userLogin.active) {
        const error = new Error("Usuário inativo");
        error.statusCode = 400;
        throw error;
    }
    const passwordCorrect = await bcrypt.compare(password, userLogin.password);
    if (!passwordCorrect) {
        const error = new Error("Senha incorreta");
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign({
        id: userLogin._id,
        role: userLogin.role,
    },
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    }
    )
    return {
        user: {
            _id: userLogin._id,
            name: userLogin.name,
            email: userLogin.email,
            cpf: userLogin.cpf,
            role: userLogin.role,
            sector: userLogin.sector,
            active: userLogin.active
        },
        token
    }
}
export default {
    register,
    login
};