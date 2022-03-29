import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class ScoreError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.SCORES, 'Score with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.SCORES + 1, 'Score with this details already exists', data);
  };

}