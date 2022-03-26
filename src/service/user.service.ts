import { CommonService } from "./base.service";
import { UserModel } from "../db/model/user/user.model";

class UserService<T> extends CommonService<T> {

}

export const userService = new UserService(UserModel);
