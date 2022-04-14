import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class CategoryError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.CATEGORY, 'Category with this details not found', data)
  }

  static NoTag(data: any = null) {
    return new UserDefinedError(ErrorCodes.CATEGORY + 2, 'You don\'t have category yet', data)

  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.CATEGORY + 1, 'Category with this details already exists', data);
  };

}