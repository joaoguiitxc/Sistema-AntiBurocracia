import userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}


// const getAllUser = async (req, res, next) => {
//   try {
//     const user = await userService.getAllUser();
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }


// const getUserById = async (req, res, next) => {
//   try {
//     const userId = await userService.getUserById(req.params.id);
//     res.json(userId);
//   } catch (error) {
//     next(error);
//   }
// }

// const updateUser = async (req, res, next) => {
//   try {
//     const user = await userService.updateUser(req.params.id, req.body);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// }

// const userDesativate = async (req, res, next) => {
//   try {
//     const userDesativate = await userService.userDesativate(req.params.id);
//     res.json(userDesativate);
//   } catch (error) {
//     next(error);
//   }
// }
// const userActivate = async(req, res, next)=>{
//   try{
// const userActivate = await userService.userActivate(req.params.id);
// res.json(userActivate);
//   }catch(error){
//  next(error);
//   }





export default {
  createUser,
  // getAllUser,
  // getUserById,
  // updateUser,
  // userDesativate,
}
