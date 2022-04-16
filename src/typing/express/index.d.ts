

import { UserDocument } from "../../db/model/user/user.model";

declare global {
  namespace Express {
    interface User extends UserDocument { }
  }
}