import { UserModel } from "../db/model/user/user.model"
import jwt from 'jsonwebtoken'
import { UserDefinedError } from "../db/common/common.error"

export const verifyUserToken = (req: any, res: any, next: any) => {
  const authToken = req.headers.authorization

  if (authToken) {
    const token = authToken.split(' ')[1]
    console.log(token);

    jwt.verify(token, process.env.JWTUSERKEY, async (err: any, data: any) => {
      if (err) {
        res.status(403).json('Token is not valid!');
      }
      console.log(data)
      const user = await UserModel.findById(data._id)
      if (!user) {
        res.status(403).json('Token is not valid!');
      }
      req.user = user;
      console.log(user)
      next()
    })
  }
  else { return res.status(401).send('You are not authenticated') }
}