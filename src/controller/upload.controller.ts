import { success } from "../common/response";
import { UserDefinedError } from "../db/common/common.error";


export async function uploadController(req, res) {

  if (!req.file) throw UserDefinedError.UnknownError('file upload error');
  return success(res, req.file.path)
}