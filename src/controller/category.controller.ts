import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { ErrorCodes, ErrorItems } from "../db/common/common.error";
import { CategoryDto, CategoryDtoGroup, CategoryGetDto } from "../db/dto/category.dto";
import { CategoryError } from "../db/model/category/category.error";
import { CategoryModel } from "../db/model/category/category.model";
import { categoryService } from "../service/category.service";
import { tagService } from "../service/tag.service";

export async function createCategoryController(req, res, next) {
  try {
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)
    const user = await CategoryModel.findOne({ name: dto.name })
    if (user) throw CategoryError.AlreadyExists(dto.name)
    const data = await categoryService.create(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}

export async function updateCategoryController(req, res, next) {
  try {

    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.UPDATE)
    const id = dto._id
    const category = await categoryService.updateById(id, dto)
    success(res, category)
  } catch (error) {
    next(error)
  }
}


export async function getCategoriesByPagingController(req, res, next) {
  try {
    const dto = await validateIt(req.query, CategoryGetDto, CategoryDtoGroup.GET_PAGING)
    dto.createdBy = req.user._id
    const tags = await tagService.getTagsByPaging(dto)
    success(res, tags)
  } catch (error) {
    next(error)
  }
}

export async function getForChooseCategoryController(req, res, next) {
  try {
    const dto = await validateIt(req.query, CategoryGetDto, CategoryDtoGroup.GET_PAGING)
    dto.createdBy = req.user._id
    const tags = await tagService.getForChoose(dto)
    success(res, tags)
  } catch (error) {
    next(error)
  }
}



export async function deleteCategoryController(req, res, next) {
  try {
    const id = req.params.id

    const data = await tagService.deleteById(id)
    success(res, 'success')
  } catch (error) {
    next(error)
  }
}
