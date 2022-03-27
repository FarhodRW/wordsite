import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { ErrorCodes, ErrorItems } from "../db/common/common.error";
import { TagDto, TagDtoGroup } from "../db/dto/tag.dto";
import { tagService } from "../service/tag.service";


export async function createTagController(req, res, next) {
  try {
    const dto = await validateIt(req.body, TagDto, TagDtoGroup.CREATE)
    dto.createdBy = req.user._id
    const data = await tagService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}




export async function updateTagController(req, res, next) {
  try {
    const id = req.params.id

    const dto = await validateIt(req.body, TagDto, TagDtoGroup.UPDATE)
    dto.createdBy = req.user._id
    const menu = await tagService.updateById(id, dto)
    success(res, menu)
  } catch (error) {
    next(error)
  }
}

export async function deleteTagController(req, res, next) {
  try {
    const id = req.params.id

    const menu = await tagService.deleteById(id, ErrorCodes.TAGS, ErrorItems.TAGS)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
