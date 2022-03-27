
export enum ErrorCodes {
  SUCCESS = 0,
  DEFAULT = 1000,
  USERS = 2000,
  WORDS = 3000,
  TAGS = 4000
}

export enum ErrorItems {
  ITEM = 'item',
  USER = 'user',
  WORDS = 'words',
  TAGS = 'tags'

}


export class UserDefinedError {

  constructor(public code: number, public message: string, public data?: any) {
  }


  static ServerError(data: any = 'error') {
    return new UserDefinedError(ErrorCodes.DEFAULT + 4, 'Server error', data)
  }

  static UnknownError(data: any) {
    return new UserDefinedError(ErrorCodes.DEFAULT + 3, 'UnknownError', data)
  }

  static ValidationError(data: any) {
    return new UserDefinedError(ErrorCodes.DEFAULT + 1, 'Validation failed', data)
  }

  static NotEnoughPermission(data: any = null) {
    return new UserDefinedError(ErrorCodes.DEFAULT + 2, 'You don`t have permission to do that', data)
  }

  static Success(data: any = 'OK') {
    return new UserDefinedError(ErrorCodes.SUCCESS, 'Success', data)
  }
}


export async function commonErrorHandler(err, _req, res, _next) {
  console.log(err)
  res.status(500).send(err)
}