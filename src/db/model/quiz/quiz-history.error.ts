import { ErrorCodes, UserDefinedError } from "../../common/common.error";

export class QuizHistoryError {
  static NotFound(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_HISTORY, 'Score with this details not found', data)
  }


  static NotEnoughWord(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_HISTORY, 'You don\' have any words yet', data)
  }



  static AlreadyExists(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_HISTORY + 1, 'Score with this details already exists', data);
  };

  static AlreadyFinished(data: any = null) {
    return new UserDefinedError(ErrorCodes.QUIZ_HISTORY + 2, 'Quiz has already finished', data);
  };

}