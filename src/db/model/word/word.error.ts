import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class WordError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.WORDS, 'Word with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.WORDS + 1, 'Word with this details already exists', data);
  };

}