import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class UserError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS, 'User with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS + 1, 'User with this details already exists', data);
  };

  static Incorrect(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS + 2, 'Username or password is incorrect', data);
  };

  static NotVerified(data: any = null) {
    return new UserDefinedError(ErrorCodes.USERS + 2, 'Email is not verified', data);
  };


}