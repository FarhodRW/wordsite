import { ErrorCodes, UserDefinedError } from "../../../common/common.error";

export class QuizItemError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_ITEM, 'Quiz item with this details not found', data)
  }

  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_ITEM + 1, 'Quiz item with this details already exists', data);
  };

}