import get from "mongoose";
import User from "../models/user.js";

const getAllUser = async () => {
  return User.find();
}

const getUserById = async (id) => {

  const userId = await User.findById(id);

  if (!userId) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return userId;
}

const updateUser = async (id, data) => {
  const userUpdate = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!userUpdate) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return userUpdate;
}

const userDesativate = async (id) => {
  const userDesativate = await User.findById(id)

  if (!userDesativate) {
    const error = new Error("não foi possível encontrar usuário!");
    error.statusCode = 404;
    throw error;
  }

 userDesativate.active = false

await userDesativate.save();

return userDesativate;
}

const userActivate = async (id) => {
  const userActivate = await User.findById(id);

  if (!userActivate) {
    const error = new Error("não foi possível encontrar usuário!");
    error.statusCode = 404;
    throw error;
  }

  userActivate.active = true;

  await userActivate.save();

  return userActivate;
};


export default {
    getAllUser,
    getUserById,
    updateUser,
    userDesativate,
    userActivate
}