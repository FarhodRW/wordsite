import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { WordDto, WordDtoGroup, WordGetDto } from "../db/dto/word.dto";
import { tagService } from "../service/tag.service";
import { wordService } from "../service/word.service";


export async function createWordController(req, res, next) {
  try {
    const dto = await validateIt(req.body, WordDto, WordDtoGroup.CREATE)
    dto.createdBy = req.user._id;
    const tagIds = [];
    if (dto.tags && dto.tags.length) {
      for (const tagName of dto.tags) {
        const tag = await tagService.saveTagService(tagName)
        tagIds.push(tag._id);
      }
    }
    dto.tags = tagIds;
    console.log("dtoooooooooooooooooooo", dto);

    const data = await wordService.save(dto);
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
    const tagIds = [];
    if (dto.tags && dto.tags.length) {
      for (const tagName of dto.tags) {
        console.log(tagName)
        const tag = await tagService.saveTagService(tagName)
        tagIds.push(tag._id);
      }
    }
    dto.tags = tagIds;
    console.log(dto);
    const menu = await wordService.updateById(id, dto)
    success(res, menu)
  } catch (error) {
    next(error)
  }
}


export async function getWordsByPagingController(req, res, next) {
  try {
    const dto = await validateIt(req.body, WordGetDto, WordDtoGroup.GET_PAGING)
    dto.createdBy = req.user._id
    console.log(dto.createdBy)
    const words = await wordService.getWordsByPaging(dto)
    return success(res, words)
  } catch (error) {
    next(error)
  }
}

export async function getPublicWordsByPagingController(req, res, next) {
  try {
    const dto = await validateIt(req.query, WordGetDto, WordDtoGroup.GET_PAGING)
    const words = await wordService.getPublicWordsByPaging(dto)
    success(res, words)
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



