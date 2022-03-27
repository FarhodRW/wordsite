import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class TagError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.TAGS, 'Tags with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.TAGS + 1, 'Tags with this details already exists', data);
  };

}