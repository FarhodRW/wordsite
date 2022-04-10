import { validateIt } from "../common/validation";
import { UserDto, UserDtoGroup } from "../db/dto/user.dto";
import bcrypt from 'bcrypt'
import { userService } from "../service/user.service";
import { success } from "../common/response";
import { ErrorCodes, ErrorItems, UserDefinedError } from "../db/common/common.error";
import jwt from 'jsonwebtoken'
import { UserError } from "../db/model/user/user.error";
import { UserModel } from "../db/model/user/user.model";


export async function createUserController(req, res, next) {
  try {
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.REGISTER)
    const user = await UserModel.findOne({ email: dto.email })
    if (user) throw UserError.AlreadyExists(user.email)
    dto.password = await bcrypt.hash(dto.password, 8)
    const data = await userService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}


export async function loginUserController(req, res, next) {
  try {
    const data = await validateIt(req.body, UserDto, UserDtoGroup.LOGIN)

    const user = await userService.getUserByEmail(data.email)
    const compare = await bcrypt.compare(data.password, user.password)
    if (!compare) throw UserError.NotFound(data.email)
    const token = jwt.sign({ _id: user._id }, process.env.JWTUSERKEY)
    success(res, { user, token })
  } catch (error) {
    next(error)
  }
}

export async function getUserProfileController(req, res, next) {
  try {
    const id = req.user._id
    console.log(id)
    const user = await userService.findById(id, '-password')
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function updateUserController(req, res, next) {
  try {
    const id = req.user._id
    const dto = await validateIt(req.body, UserDto, UserDtoGroup.UPDATE)
    console.log(dto)
    if (dto.password)
      dto.password = await bcrypt.hash(dto.password, 8)
    console.log(dto.password);

    const user = await userService.updateById(id, dto)
    success(res, user)
  } catch (error) {
    next(error)
  }
}


export async function deleteUserController(req, res, next) {
  try {
    const id = req.user._id
    console.log(id);

    const user = await userService.updateById(id, { isDeleted: true })
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}



