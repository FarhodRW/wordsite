import { UserModel } from "../db/model/user/user.model"
import jwt from 'jsonwebtoken'
import { UserDefinedError } from "../db/common/common.error"

export const verifyUserToken = async (req: any, res: any, next: any) => {
  try {
    const authToken = req.headers.authorization
    if (!authToken) throw UserDefinedError.UnAthorizated()
    const tokenParams = authToken.split(' ')
    if (tokenParams.length < 2) {
      throw UserDefinedError.UnAthorizated()
    }
    const token = tokenParams[1];

    console.log(token);

    const data = await jwt.verify(token, process.env.JWTUSERKEY)
    const user = await UserModel.findById(data._id)
    if (!user) {
      throw UserDefinedError.InvalidToken()
    }
    req.user = user;
    next()
  } catch (e) {
    next(e)
  }
}