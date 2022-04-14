import { Model } from 'mongoose';
import { UserDto } from "../db/dto/user.dto";
import { UserError } from "../db/model/user/user.error";
import { UserModel } from "../db/model/user/user.model";
import { CommonService } from "./base.service";

class UserService<T> extends CommonService<T> {

  constructor(model: Model<T>) {
    super(model)
  }

  public async save(dto: UserDto) {

    try {
      const user = await this.create(dto);
      return user;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
    }
  }

  public async getUserByEmail(email: string) {
    const user = await this.model.findOne({ email });
    if (!user) throw UserError.Incorrect()
    return user;
  }


  public async findById(id) {
    const user = await this.model.findById(id, '-password')
    return user
  }

  public async updateById(id, dto) {

    try {
      const user = await this.updateById(id, dto);
      return user;
    } catch (e) {
      console.log(e);

    }
  }
}

export const userService = new UserService(UserModel);
