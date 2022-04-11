import { CommonService } from "./base.service";
import { UserModel } from "../db/model/user/user.model";
import { Model } from 'mongoose'
import { ErrorCodes, ErrorItems, UserDefinedError } from "../db/common/common.error";
import { UserError } from "../db/model/user/user.error";

class UserService<T> extends CommonService<T> {

  constructor(model: Model<T>) {
    super(model)
  }

  public async getUserByEmail(email: string) {
    const user = await this.model.findOne({ email });
    if (!user) throw UserError.Incorrect()
    return user;
  }
}

export const userService = new UserService(UserModel);
