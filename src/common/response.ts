import { UserDefinedError } from "../db/common/common.error";

export async function success(res, data) {
  console.log("response", data)
  return res.status(200).send(UserDefinedError.Success(data))
}