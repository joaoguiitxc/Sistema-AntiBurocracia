import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const register = async (data) => {
    const { name, email, password, role, sector, active } = data;
    if (!name || !email || !password || !role || !sector || !active) {
        const error = new Error("todos os campos devem ser preenchidos corretamente")

        error.statusCode = 400;
        throw error;
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error ("Esse usuário já existe");
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 
    sector,
    active: true,
})