import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { ErrorCodes, ErrorItems } from "../db/common/common.error";
import { WordDto, WordDtoGroup } from "../db/dto/word.dto";
import { wordService } from "../service/word.service";


export async function createWordController(req, res, next) {
  try {
    const dto = await validateIt(req.body, WordDto, WordDtoGroup.CREATE)
    dto.createdBy = req.user._id
    const data = await wordService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}




export async function updateWordController(req, res, next) {
  try {
    const id = req.params.id

    const dto = await validateIt(req.body, WordDto, WordDtoGroup.UPDATE)
    dto.createdBy = req.user._id
    const menu = await wordService.updateById(id, dto)
    success(res, menu)
  } catch (error) {
    next(error)
  }
}

export async function deleteWordController(req, res, next) {
  try {
    const id = req.params.id

    const menu = await wordService.deleteById(id)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
