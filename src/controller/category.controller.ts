import { success } from "../common/response";
import { validateIt } from "../common/validation";
import { CategoryDto, CategoryDtoGroup, CategoryGetDto } from "../db/dto/category.dto";
import { categoryService } from "../service/category.service";

export async function createCategoryController(req, res, next) {
  try {
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.CREATE)
    const data = await categoryService.save(dto);
    success(res, data)
  } catch (error) {
    next(error)
  }
}

export async function updateCategoryController(req, res, next) {
  try {
    const dto = await validateIt(req.body, CategoryDto, CategoryDtoGroup.UPDATE)
    const category = await categoryService.updateById(req.params.id, dto)
    success(res, category)
  } catch (error) {
    next(error)
  }
}


export async function getCategoriesByPagingController(req, res, next) {
  try {
    const dto = await validateIt(req.query, CategoryGetDto, CategoryDtoGroup.GET_PAGING)
    dto.createdBy = req.user._id
    const tags = await categoryService.getByPaging(dto)
    success(res, tags)
  } catch (error) {
    next(error)
  }
}

export async function getForChooseCategoryController(req, res, next) {
  try {
    const dto = await validateIt(req.query, CategoryGetDto, CategoryDtoGroup.GET_PAGING)
    dto.createdBy = req.user._id
    const tags = await categoryService.getForChoose(dto)
    success(res, tags)
  } catch (error) {
    next(error)
  }
}



export async function deleteCategoryController(req, res, next) {
  try {
    const id = req.params.id
    const data = await categoryService.deleteById(id)
    success(res)
  } catch (error) {
    next(error)
  }
}
