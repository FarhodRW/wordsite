import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { ErrorCodes, ErrorItems } from "../db/common/common.error";
import { TagDto, TagDtoGroup, TagGetDto } from "../db/dto/tag.dto";
import { TagError } from "../db/model/tag/tag.error";
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


export async function getTagsByPagingController(req, res, next) {
  try {
    const dto = await validateIt(req.query, TagGetDto, TagDtoGroup.GET_PAGING)
    const tags = await tagService.getTagsByPaging(dto)
    success(res, tags)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function getForChooseController(req, res, next) {
  try {
    const dto = await validateIt(req.query, TagGetDto, TagDtoGroup.GET_PAGING)
    const tags = await tagService.getForChoose(dto)
    success(res, tags)
  } catch (error) {
    console.log(error)
    next(error)
  }
}



export async function deleteTagController(req, res, next) {
  try {
    const id = req.params.id

    const menu = await tagService.deleteById(id)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
