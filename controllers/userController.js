import userService from "../services/userService.js";

const createUser = async (req, res, next) => {

  try {

    const user = await userService.createUser(
      req.body
    );


    return res.status(201).json({
      message: "Usuário criado com sucesso",
      data: user
    });


  } catch (error) {

    next(error);

  }
};
const getAllUser = async (req, res, next) => {
  try {
    const users = await userService.getAllUser();

    return res.status(200).json(users);

  } catch (error) {
    next(error);
  }
};


const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    return res.status(200).json(user);

  } catch (error) {
    next(error);
  }
};


const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const deactivateUser = async (req, res, next) => {
  try {
    const user = await userService.deactivateUser(
      req.params.id
    );

    return res.status(200).json({
      message: "Usuário desativado com sucesso",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


const activateUser = async (req, res, next) => {
  try {
    const user = await userService.activateUser(
      req.params.id
    );

    return res.status(200).json({
      message: "Usuário ativado com sucesso",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


export default {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deactivateUser,
  activateUser,
};